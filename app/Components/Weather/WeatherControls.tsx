"use client"
import React from 'react';
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import SunMoon from "@/app/Components/Weather/SunMoon";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/app/Stores";
import {decLocationPointer, incLocationPointer} from "@/app/Stores/utilsSlice";

const WeatherControls = () => {
    const locationsAmount = useSelector((state:RootState) => state.geocode.length) - 1
    const locationPointer = useSelector((state:RootState) => state.utils.locationPointer )
    const weather = useSelector((state:RootState) => state.currentWeather)
    const dispatch = useAppDispatch()

    const increaseLocationPointer = ()=> {
        if(locationPointer + 1 > locationsAmount) return
        console.log(locationPointer)
        console.log(locationsAmount)
        dispatch(incLocationPointer())
    }
    const decreaseLocationPointer = ()=> {
        if(locationPointer - 1 < 0) return
        console.log(locationPointer)
        console.log(locationsAmount)
        dispatch(decLocationPointer())
    }
    return (
        <div className={"flex items-center justify-center gap-20 relative h-[20svh]"}>
            <SunMoon/>
            <button onClick={()=>{
                console.log("clicked button")
                decreaseLocationPointer()
                console.log(weather)
            }} className={"text-7xl"}> <MdOutlineKeyboardArrowLeft /></button>
            <h2 className={"text-5xl font-medium"}>{weather.current.temperature_2m}&deg;</h2>
            <button onClick={()=>{
                console.log("clicked button")
                increaseLocationPointer()
            }} className={"text-7xl"}> <MdOutlineKeyboardArrowRight /></button>
        </div>
    );
};

export default WeatherControls;