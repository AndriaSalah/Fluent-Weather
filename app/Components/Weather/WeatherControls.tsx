"use client"
import React from 'react';
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import SunMoon from "@/app/Components/Weather/SunMoon";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/app/Stores";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";

const WeatherControls = () => {
    const weather = useSelector((state:RootState) => state.currentWeather)
    const dispatch = useAppDispatch()
    return (
        <div className={"flex items-center justify-center gap-20 relative h-[20svh]"}>
            <SunMoon/>
            <button onClick={()=>{
                console.log("clicked button")
                dispatch(getCurrentWeather())
                console.log(weather)
            }} className={"text-7xl"}> <MdOutlineKeyboardArrowLeft /></button>
            <h2 className={"text-5xl font-medium"}>{weather.current.temperature_2m}&deg;</h2>
            <button onClick={()=>{
                console.log("clicked button")
                dispatch(getDailyWeather())
            }} className={"text-7xl"}> <MdOutlineKeyboardArrowRight /></button>
        </div>
    );
};

export default WeatherControls;