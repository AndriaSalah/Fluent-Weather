"use client"
import React, {useEffect} from 'react';
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import SunMoon from "@/app/Components/Weather/SunMoon";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/app/Stores";
import {decLocationPointer, incLocationPointer, updateLeftButton, updateRightButton} from "@/app/Stores/utilsSlice";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";

const WeatherControls = () => {
    const savedLocations = useSelector((state:RootState) => state.geocode)
    const {locationPointer, leftButtonEnabled , rightButtonEnabled} = useSelector((state:RootState) => state.utils )
    const weather = useSelector((state:RootState) => state.currentWeather)
    const isDay = useSelector((state:RootState)=> state.currentWeather.current.is_day)
    const dispatch = useAppDispatch()

    const increaseLocationPointer = ()=> {
        if(locationPointer + 1 > savedLocations.length - 1) return
        dispatch(incLocationPointer())
    }
    const decreaseLocationPointer = ()=> {
        if(locationPointer - 1 < 0) return
        dispatch(decLocationPointer())
    }

    useEffect(() => {
        if(savedLocations.length > 0) {
            const lat = savedLocations[locationPointer].location.lat
            const lng = savedLocations[locationPointer].location.lng
            dispatch(getCurrentWeather(lat!, lng!))
            dispatch(getDailyWeather(lat!, lng!))
        }
        locationPointer + 1 > savedLocations.length -1 ? dispatch(updateRightButton(false)) : dispatch(updateRightButton(true))
        locationPointer - 1 < 0 ? dispatch(updateLeftButton(false)) : dispatch(updateLeftButton(true))
    }, [dispatch, locationPointer, savedLocations]);
    return (
        <div className={"flex items-center justify-center gap-20 relative h-[20svh]"}>
            <SunMoon isDay={isDay}/>
            <div className={"w-[5rem]"}>
            <button onClick={()=>{
                console.log("clicked button")
                decreaseLocationPointer()
                console.log(weather)
            }} className={`text-7xl ${!leftButtonEnabled && "hidden"}`}> <MdOutlineKeyboardArrowLeft /></button>
            </div>
            <h2 className={`text-5xl font-medium ${!isDay && "text-black"}`}>{weather.current.temperature_2m}&deg;</h2>
            <div className={"w-[5rem]"}>
            <button onClick={()=>{
                console.log("clicked button")
                increaseLocationPointer()
            }} className={`text-7xl ${!rightButtonEnabled && "hidden"}`}> <MdOutlineKeyboardArrowRight /></button>
            </div>
        </div>
    );
};

export default WeatherControls;