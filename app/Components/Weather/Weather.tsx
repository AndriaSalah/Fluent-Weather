import Clock from "@/app/Components/Weather/Components/Clock";
import WeatherControls from "@/app/Components/Weather/Components/WeatherControls/WeatherControls";
import React, {useCallback, useEffect, useState} from "react";
import WeatherHeader from "@/app/Components/Weather/Components/WeatherHeader/WeatherHeader";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {
    FaCloud, FaCloudBolt,
    FaCloudShowersHeavy, FaCloudShowersWater,
    FaCloudversify,
    FaSnowflake,
    FaSun,
    FaCloudSun, FaMoon, FaCloudMoon, FaCloudSunRain, FaCloudMoonRain
} from "react-icons/fa6";
import {resetWeatherEffects, setWeatherEffects} from "@/app/Stores/CurrentWeatherSlice";
import Clouds from "@/app/Components/Weather/WeatherEffects/Clouds/Clouds";
import {Rain} from "@/app/Components/Weather/WeatherEffects/Rain/Rain";
import {Snow} from "@/app/Components/Weather/WeatherEffects/Snow/Snow";
import WeatherEffects from "@/app/Components/Weather/WeatherEffects/WeatherEffects";
import WeatherDescription from "@/app/Components/Weather/Components/WeatherControls/WeatherDescription";


interface props {
    openGpsDialog: () => void
}

const Weather: React.FC<props> = ({openGpsDialog}) => {

    const {transition} = useAppSelector(state => state.flags)


    return (
        <section className={`flex w-full h-svh flex-col p-6 relative z-10 `}>
            <WeatherEffects/>
            <WeatherHeader openGpsDialog={openGpsDialog}/>
            <div
                className={`flex flex-col flex-1 justify-center max-md:gap-8 gap-14 ${transition ? "opacity-0" : "opacity-100"} duration-500 ease-in-out `}>
                <WeatherControls/>
                <WeatherDescription/>
                <Clock/>
            </div>
        </section>
    );
};


export default Weather;
