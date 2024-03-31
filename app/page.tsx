"use client"
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {DialogHandles} from "@/app/Components/GreetingDialog/GreetingDialog";
import {loadFromLocalStorage} from "@/app/Stores/LocationsSlice";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import {hydrateUserFromLocal, toggleExpansion} from "@/app/Stores/utilsSlice";
import GpsDialog from "@/app/Components/GpsDialog/GpsDialog";
import {hydrateInitialLocationState} from "@/app/Stores/FlagsSlice";
import Overlays from "@/app/UI/Overlays";
import TransitionScreen from "@/app/UI/TransitionScreen";


export default function Home() {
    const gpsDialog = useRef<DialogHandles>(null)
    const isDay = useAppSelector(state => state.currentWeather.current.is_day)
    const {expand} = useAppSelector(state => state.utils);
    const isTransitioning = useAppSelector(state => state.flags.transition)
    const dispatch = useAppDispatch()


    function clickHandler() {
        dispatch(toggleExpansion());
    }

    useEffect(() => {
        dispatch(loadFromLocalStorage());
        dispatch(hydrateUserFromLocal())
        dispatch(hydrateInitialLocationState())
    }, [dispatch]);

    useEffect(() => {
        const ChangeThemeColor = () => {
            const meta = document.querySelector("meta[name='theme-color']")
            isTransitioning ?
                meta?.setAttribute("content", "#000")
                : isDay ?
                    meta?.setAttribute("content", "#7ea4cf")
                    : meta?.setAttribute("content", "#2b2e4f")
        }
        ChangeThemeColor()
    }, [isDay, isTransitioning]);


    return (
        <>
            <Overlays openGpsDialog={() => gpsDialog.current?.openDialog()}/>
            <GpsDialog message={"GPS"} ref={gpsDialog}/>
            <main
                className={`w-full h-[100svh] bg-no-repeat bg-cover ${isDay ? "bg-day" : "bg-night"} duration-100 relative overflow-clip`}>
                <TransitionScreen/>
                <Weather openGpsDialog={() => gpsDialog.current?.openDialog()}/>
                <WeatherData/>
                <button
                    onClick={clickHandler}
                    className={`h-10 w-10 text-white backdrop-blur-3xl rounded-[50%] text-5xl flex items-center z-30
         fixed bottom-2 right-[50vw] translate-x-1/2 md:hidden 
         ${expand ? "-rotate-90 bg-black bg-opacity-50 " : "rotate-90 bg-white bg-opacity-50 "}  duration-200`}>
                    <MdOutlineKeyboardArrowLeft/>
                </button>
            </main>

        </>
    );
}
