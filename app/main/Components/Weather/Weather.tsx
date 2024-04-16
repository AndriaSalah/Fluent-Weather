
import React from "react";
import {useAppSelector} from "@/app/Stores/Store";
import WeatherDescription from "@/app/main/Components/Weather/Components/WeatherControls/WeatherDescription";
import WeatherEffects from "@/app/main/Components/Weather/WeatherEffects/WeatherEffects";
import WeatherHeader from "@/app/main/Components/Weather/Components/WeatherHeader/WeatherHeader";
import WeatherControls from "@/app/main/Components/Weather/Components/WeatherControls/WeatherControls";
import Clock from "@/app/main/Components/Weather/Components/Clock";



const Weather: React.FC = () => {
    const {transition} = useAppSelector(state => state.flags)
    return (
        <section className={`flex w-full h-svh flex-col p-6 relative z-10 `}>
            <WeatherEffects/>
            <WeatherHeader/>
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
