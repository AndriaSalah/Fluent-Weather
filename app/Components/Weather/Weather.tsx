import Clock from "@/app/Components/Weather/Components/Clock";
import WeatherControls from "@/app/Components/Weather/Components/WeatherControls/WeatherControls";
import React from "react";
import WeatherHeader from "@/app/Components/Weather/Components/WeatherHeader/WeatherHeader";
import {useAppSelector} from "@/app/Stores/Store";
import WeatherEffects from "@/app/Components/Weather/WeatherEffects/WeatherEffects";
import WeatherDescription from "@/app/Components/Weather/Components/WeatherControls/WeatherDescription";


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
