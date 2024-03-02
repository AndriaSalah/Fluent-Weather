"use client"
import Image from "next/image";
import pic1 from "@/public/pikb28.jpg";
import pic2 from "@/public/pikb29-test.jpg";
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {AppDispatch, RootState, useAppDispatch} from "@/app/Stores";
import DialogBox, {DialogHandles} from "@/app/Components/DialogBox/DialogBox";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import TextField from "@/app/UI/TextField";
import {loadFromLocalStorage} from "@/app/Stores/GeocodeSlice";

export default function Home() {
    const greetingDialog = useRef<DialogHandles>(null)
    const dispatch = useAppDispatch()
    const savedLocations = useSelector((state:RootState)=> state.geocode)


    useEffect(() => {
        const init = (lat:number , lng :number)=>{
            dispatch(getCurrentWeather(lat,lng))
            dispatch(getDailyWeather(lat,lng))
        }
        greetingDialog.current?.openDialog()
        dispatch(loadFromLocalStorage())
        if(savedLocations.length > 0){
        const lat = savedLocations[0].location.lat!
        const lng = savedLocations[0].location.lng!
        init(lat,lng)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
