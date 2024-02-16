"use client"
import Image from "next/image";
import pic1 from "@/public/pikb28.jpg";
import pic2 from "@/public/pikb29-test.jpg";
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {AppDispatch, useAppDispatch} from "@/app/Stores";
import DialogBox, {DialogHandles} from "@/app/Components/DialogBox/DialogBox";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import TextField from "@/app/UI/TextField";

export default function Home() {
    const greetingDialog = useRef<DialogHandles>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        greetingDialog.current?.openDialog()
       dispatch(getCurrentWeather())
        dispatch(getDailyWeather())
    }, [dispatch]);


    return (
        <>
            <DialogBox ref={greetingDialog} message={"Hello!"} onSubmit={()=>{}}>
                <p className={"text-lg"}>lets start by searching for a place</p>
                <TextField dark={true}/>
            </DialogBox>
        <main className={"w-full h-svh"}>
            <Image
                src={pic1}
                alt="askdas"
                sizes="(max-width: 768px) 110vw"
                className="h-screen -z-20 absolute animate-slide object-cover  "
            />
            <Weather/>
            <WeatherData/>
        </main>
        </>
    );
}
