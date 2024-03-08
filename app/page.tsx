"use client"
import Image from "next/image";
import pic1 from "@/public/pikb28.jpg";
import pic2 from "@/public/pikb29-test.jpg";
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {RootState, useAppDispatch} from "@/app/Stores";
import DialogBox, {DialogHandles} from "@/app/Components/DialogBox/DialogBox";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import TextField from "@/app/UI/TextField";
import {loadFromLocalStorage} from "@/app/Stores/GeocodeSlice";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import {toggleExpansion} from "@/app/Stores/utilsSlice";


export default function Home() {
    const greetingDialog = useRef<DialogHandles>(null)
    const dispatch = useAppDispatch()
    const savedLocations = useSelector((state:RootState)=> state.geocode)
    const isDay = useSelector((state:RootState)=> state.currentWeather.current.is_day)
    const toggle = useSelector((state: RootState) => state.utils.expand);

    function clickHandler() {
        dispatch(toggleExpansion());
        console.log("clicked");
    }
    useEffect(() => {
        dispatch(loadFromLocalStorage());
       greetingDialog.current?.openDialog();
    }, [dispatch]);

    useEffect(() => {
        const init = (lat: number, lng: number ) => {
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
            {/*<DialogBox ref={greetingDialog} message={"Hello!"} onSubmit={()=>{}}>*/}
            {/*    <p className={"text-lg"}>lets start by searching for a place</p>*/}
            {/*    <TextField dark={true}/>*/}
            {/*    <button className={"text-[0.8rem] w-1/2 text-center text-blue-700"}>Use location instead ?</button>*/}
            {/*</DialogBox>*/}
            <DialogBox message={"Hello!"} onSubmit={()=>{}} ref={greetingDialog}/>
        <main className={`w-full min-h-svh`}>
            <Image
                src={isDay ? pic1 : pic2}
                alt="askdas"
                sizes="(max-width: 768px) 125vw"
                quality={100}
                className={`w-full min-h-[50rem] absolute object-cover ${isDay === 0 && "brightness-50"} `}
            />
            <Weather/>
            <WeatherData/>
            <button
                onClick={clickHandler}
                className={`h-10 w-10 text-white backdrop-blur-3xl rounded-[50%] text-5xl flex items-center z-30
         fixed bottom-2 right-[50vw] translate-x-1/2 md:hidden 
         ${toggle ? "-rotate-90 bg-black bg-opacity-50 " : "rotate-90 bg-white bg-opacity-50 " }  duration-300`}>
                <MdOutlineKeyboardArrowLeft />
            </button>
        </main>
        </>
    );
}
