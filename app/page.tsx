'use client'
import React, {useEffect, useRef, useState} from "react";
import AutoComplete from "@/app/UI/AutoComplete";
import UnderlinedText from "@/app/UI/UnderlinedText";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {setName} from "@/app/Stores/utilsSlice";
import {hydrateFlags, setFirstTime, setInitialLocationState} from "@/app/Stores/FlagsSlice";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import GpsDialog, {DialogHandles} from "@/app/UI/GpsDialog";
import {getWeather} from "@/app/Stores/LocationsSlice";
import {useRouter} from "next/navigation";


const buttonStyles: string = "px-2 py-2 rounded-3xl border border-black border-opacity-15 hover:bg-blue-400 hover:text-white duration-300 w-1/2 md:w-1/4"

export default function Home () {
    const {firstTime} = useAppSelector(state => state.flags)
    const dispatch = useAppDispatch()
    const router = useRouter()
    useEffect(() => {
       dispatch(hydrateFlags())
    },[dispatch]);
    useEffect(() => {
        console.error("first time " , firstTime);
        if(firstTime !== null ) firstTime ? router.push("/greeting") : router.push("/main")
    },[firstTime, router]);
    return null
}


