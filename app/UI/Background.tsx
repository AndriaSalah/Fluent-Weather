import React from 'react';
import Image from "next/image";
import day from "@/public/day.webp";
import night from "@/public/night.webp";
import {useAppSelector} from "@/app/Stores/Store";

const Background = () => {
    const isDay = useAppSelector(state => state.currentWeather.current.is_day)
    return (
        <div className={"w-[110%] fixed"}>
            <Image src={isDay? day:night} alt={"background Image"} className={"object-cover h-svh animate-slideMobile md:animate-slide"}/>
        </div>
    );
};

export default Background;