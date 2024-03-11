"use client"
import Image from "next/image";
import pic1 from "@/public/pikb28.jpg";
import pic2 from "@/public/pikb29-test.jpg";
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {RootState, useAppDispatch} from "@/app/Stores";
import DialogBox, {DialogHandles} from "@/app/Components/DialogBox/DialogBox";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import TextField from "@/app/UI/TextField";
import {loadFromLocalStorage} from "@/app/Stores/GeocodeSlice";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import {hydrateUserFromLocal, toggleExpansion} from "@/app/Stores/utilsSlice";


export default function Home() {
    const greetingDialog = useRef<DialogHandles>(null)
    const dispatch = useAppDispatch()
    const savedLocations = useSelector((state: RootState) => state.geocode)
    const isDay = useSelector((state: RootState) => state.currentWeather.current.is_day)
    const toggle = useSelector((state: RootState) => state.utils.expand);
    const firstTime = useSelector((state : RootState) => state.utils.firstTime)
    function clickHandler() {
        dispatch(toggleExpansion());
        console.log("clicked");
    }

    useEffect(() => {
        dispatch(loadFromLocalStorage());
        dispatch(hydrateUserFromLocal())
        firstTime && greetingDialog.current?.openDialog();
    }, [dispatch,firstTime]);

    useEffect(() => {
        const init = (lat: number, lng: number) => {
            if (lat && lng) {
                dispatch(getCurrentWeather(lat, lng));
                dispatch(getDailyWeather(lat, lng));
            }
        };
        if (savedLocations.length > 0) {
            const lat = savedLocations[0].location.lat!;
            const lng = savedLocations[0].location.lng!;
            init(lat, lng);
        }

    }, [dispatch, savedLocations]);


    return (
        <>
            <DialogBox message={"Hello!"} onSubmit={() => {
            }} ref={greetingDialog}/>
            <main className={`w-full h-[100vh] bg-no-repeat bg-cover bg-night`}>
                <span
                    className={`block w-full h-screen absolute bg-black ${isDay ? "bg-opacity-0" : "bg-opacity-55"} `}/>
                <Weather/>
                <WeatherData/>
                <button
                    onClick={clickHandler}
                    className={`h-10 w-10 text-white backdrop-blur-3xl rounded-[50%] text-5xl flex items-center z-30
         fixed bottom-2 right-[50vw] translate-x-1/2 md:hidden 
         ${toggle ? "-rotate-90 bg-black bg-opacity-50 " : "rotate-90 bg-white bg-opacity-50 "}  duration-300`}>
                    <MdOutlineKeyboardArrowLeft/>
                </button>
            </main>
        </>
    );
}
