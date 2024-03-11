"use client"
import Clock from "@/app/Components/Weather/Clock";
import WeatherControls from "@/app/Components/Weather/WeatherControls";
import React from "react";
import WeatherHeader from "@/app/Components/Weather/WeatherHeader";

interface props {
    openGpsDialog : ()=> void
}

const Weather : React.FC<props>  = ({openGpsDialog}) => {
    return (
        <section className={`flex w-full h-svh flex-col gap-20 md:gap-56 p-6 relative z-10`}>
           <WeatherHeader openGpsDialog={openGpsDialog}/>
            <div className={"flex flex-col max-md:gap-8 gap-14 "}>
                <WeatherControls/>
                <h2 className={"text-center text-3xl"}>Sunny</h2>
                <Clock/>
            </div>
        </section>
    );
};

Weather.propTypes = {};

export default Weather;
