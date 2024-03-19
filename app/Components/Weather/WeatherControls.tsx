"use client"
import React, {useEffect} from 'react';
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import SunMoon from "@/app/Components/Weather/SunMoon";

import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {updateLeftButton, updateRightButton} from "@/app/Stores/utilsSlice";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {decLocationPointer, incLocationPointer} from "@/app/Stores/LocationsSlice";


const WeatherControls = () => {
    const {locationPointer,locationsData} = useAppSelector(state => state.locations)
    const {leftButtonEnabled , rightButtonEnabled , firstTime} = useAppSelector(state => state.utils )
    const weather = useAppSelector(state  => state.currentWeather)
    const isDay = useAppSelector(state => state.currentWeather.current.is_day)
    const dispatch = useAppDispatch()

    const increaseLocationPointer = ()=> {
        if(locationPointer + 1 > locationsData.length - 1) return
        dispatch(incLocationPointer())
    }
    const decreaseLocationPointer = ()=> {
        if(locationPointer - 1 < 0) return
        dispatch(decLocationPointer())
    }

    useEffect(() => {
        if(locationsData.length > 0 && !firstTime) {
            const {lat,lng} = locationsData[locationPointer].location
            setTimeout(()=>{
                dispatch(getCurrentWeather(lat!, lng!))
                dispatch(getDailyWeather(lat!, lng!))
            },400)
        }
        locationPointer + 1 > locationsData.length -1 ? dispatch(updateRightButton(false)) : dispatch(updateRightButton(true))
        locationPointer - 1 < 0 ? dispatch(updateLeftButton(false)) : dispatch(updateLeftButton(true))
    }, [dispatch, firstTime, locationPointer, locationsData]);
    return (
        <div className={"flex items-center justify-center gap-10 md:gap-20 relative max-md:h-[24vh] md:h-[20vh]"}>
            <SunMoon isDay={isDay}/>
            <div className={"w-[3rem] flex-shrink-0"}>
            <button onClick={()=>{
                console.log("clicked button")
                decreaseLocationPointer()
                console.log(weather)
            }} className={`text-5xl md:text-7xl ${!leftButtonEnabled && "hidden"}`}> <MdOutlineKeyboardArrowLeft /></button>
            </div>
            <h2 className={`text-5xl md:text-6xl font-light ${!isDay && "text-black"}`}>{weather.current.temperature_2m}&deg;</h2>
            <div className={"w-[3rem] flex-shrink-0 "}>
            <button onClick={()=>{
                console.log("clicked button")
                increaseLocationPointer()
            }} className={`text-5xl md:text-7xl ${!rightButtonEnabled && "hidden"}`}> <MdOutlineKeyboardArrowRight /></button>
            </div>
        </div>
    );
};

export default WeatherControls;