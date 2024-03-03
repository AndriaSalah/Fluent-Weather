"use client"
import Image from "next/image";
import pic1 from "@/public/pikb28.jpg";
import pic2 from "@/public/pikb29-test.jpg";
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {RootState, useAppDispatch} from "@/app/Stores";
import DialogBox, {DialogHandles} from "@/app/Components/DialogBox/DialogBox";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import TextField from "@/app/UI/TextField";
import {loadFromLocalStorage} from "@/app/Stores/GeocodeSlice";


export default function Home() {
    const greetingDialog = useRef<DialogHandles>(null)
    const dispatch = useAppDispatch()
    const savedLocations = useSelector((state:RootState)=> state.geocode)
    const isDay = useSelector((state:RootState)=> state.currentWeather.current.is_day)
    useEffect(() => {
        dispatch(loadFromLocalStorage());
        greetingDialog.current?.openDialog();
    }, [dispatch]);

    useEffect(() => {
        const init = (lat: number | null, lng: number | null) => {
            if (lat && lng) {
                dispatch(getCurrentWeather(lat, lng));
                dispatch(getDailyWeather(lat, lng));
            }
        };
        if (savedLocations.length > 0) {
            const lat = savedLocations[0]?.location.lat!;
            const lng = savedLocations[0]?.location.lng!;
            init(lat, lng);
        }

    }, [dispatch, savedLocations]);



    return (
        <>
            <DialogBox ref={greetingDialog} message={"Hello!"} onSubmit={()=>{}}>
                <p className={"text-lg"}>lets start by searching for a place</p>
                <TextField dark={true}/>
            </DialogBox>
        <main className={"w-full h-svh"}>
            <Image
                src={isDay ? pic1 : pic2}
                alt="askdas"
                sizes="(max-width: 768px) 110vw"
                className={`h-screen -z-20 absolute animate-slide object-cover ${isDay === 0 && "brightness-50"} `}
            />
            <Weather/>
            <WeatherData/>
        </main>
        </>
    );
}
