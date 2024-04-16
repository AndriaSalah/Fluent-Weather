"use client"
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {AutoGps, loadFromLocalStorage} from "@/app/Stores/LocationsSlice";
import {getSavedUserName} from "@/app/Stores/utilsSlice";
import Overlays from "@/app/UI/Overlays";
import TransitionScreen from "@/app/UI/TransitionScreen";
import Background from "@/app/UI/Background";
import ViewWeatherDataButton from "@/app/UI/ViewWeatherDataButton";

const Main = () => {
    const isDay = useAppSelector(state => state.currentWeather.current.is_day)
    const {transition,useGPS} = useAppSelector(state => state.flags)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getSavedUserName())
        useGPS ? dispatch(AutoGps()) : dispatch(loadFromLocalStorage())
    }, [dispatch]);


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
            <main className={`grid place-items-center w-full h-svh duration-100 relative overflow-hidden`}>
                <Background/>
                <TransitionScreen/>
                <Weather/>
                <WeatherData/>
                <ViewWeatherDataButton isMobile={true}/>
            </main>

        </>
    );
};

export default Main;