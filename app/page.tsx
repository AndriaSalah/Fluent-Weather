"use client"
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import React, {useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {DialogHandles} from "@/app/Components/GreetingDialog/GreetingDialog";
import {loadFromLocalStorage} from "@/app/Stores/LocationsSlice";
import {hydrateUserFromLocal} from "@/app/Stores/utilsSlice";
import GpsDialog from "@/app/Components/GpsDialog/GpsDialog";
import {hydrateInitialLocationState, hydrateLocationPermState} from "@/app/Stores/FlagsSlice";
import Overlays from "@/app/UI/Overlays";
import TransitionScreen from "@/app/UI/TransitionScreen";
import Background from "@/app/UI/Background";
import ViewWeatherDataButton from "@/app/UI/ViewWeatherDataButton";

export default function Home() {
    const gpsDialog = useRef<DialogHandles>(null)
    const isDay = useAppSelector(state => state.currentWeather.current.is_day)
    const {transition , locationPermState} = useAppSelector(state => state.flags)
    const dispatch = useAppDispatch()



    useEffect(() => {
        dispatch(loadFromLocalStorage());
        dispatch(hydrateUserFromLocal())
        dispatch(hydrateInitialLocationState())
        dispatch(hydrateLocationPermState())
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
            <Overlays openGpsDialog={() => gpsDialog.current?.openDialog()}/>
            {!locationPermState && <GpsDialog message={"GPS"} ref={gpsDialog}/>}
            <main className={`grid place-items-center w-full h-[100svh] duration-100 relative overflow-clip`}>
                <Background/>
                <TransitionScreen/>
                <Weather openGpsDialog={() => gpsDialog.current?.openDialog()}/>
                <WeatherData/>
                <ViewWeatherDataButton isMobile={true}/>
            </main>

        </>
    );
}
