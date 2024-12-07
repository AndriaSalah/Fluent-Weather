import React from 'react';
import Image from "next/image";
import day from "@/public/day.webp";
import night from "@/public/night.webp";
import {useAppSelector} from "@/app/Stores/Store";

const Background = () => {
    const isDay = useAppSelector(state => state.currentWeather.current.is_day)
    return (
        <div className={"w-[110vw] fixed -z-10"}>
            <Image src={isDay? day:night} alt={"background Image"} className={"object-cover w-full h-svh animate-slideMobile md:animate-slide"}/>
        </div>
    );
};

export default Background;