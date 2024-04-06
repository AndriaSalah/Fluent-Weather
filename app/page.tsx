"use client"
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {AutoGps, loadFromLocalStorage} from "@/app/Stores/LocationsSlice";
import {hydrateUserFromLocal} from "@/app/Stores/utilsSlice";
import {hydrateFlags} from "@/app/Stores/FlagsSlice";
import Overlays from "@/app/UI/Overlays";
import TransitionScreen from "@/app/UI/TransitionScreen";
import Background from "@/app/UI/Background";
import ViewWeatherDataButton from "@/app/UI/ViewWeatherDataButton";

export default function Home() {
    const isDay = useAppSelector(state => state.currentWeather.current.is_day)
    const {transition,useGPS} = useAppSelector(state => state.flags)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(hydrateFlags())
        dispatch(hydrateUserFromLocal())
        dispatch(loadFromLocalStorage())
    }, [dispatch]);

    useEffect(() => {
        useGPS && dispatch(AutoGps())
    }, [dispatch,useGPS]);

    useEffect(() => {
        const ChangeThemeColor = () => {
            const metaThemeColor = document.querySelector("meta[name='theme-color']")
                metaThemeColor?.setAttribute("content", transition ? "#000" : isDay ? "#7ea4cf" : "#2b2e4f")
        }
        ChangeThemeColor()
    }, [isDay, transition]);


    return (
        <>
            <Overlays/>
            <main className={`grid place-items-center w-full h-[100svh] duration-100 relative overflow-clip`}>
                <Background/>
                <TransitionScreen/>
                <Weather/>
                <WeatherData/>
                <ViewWeatherDataButton isMobile={true}/>
            </main>

        </>
    );
}
