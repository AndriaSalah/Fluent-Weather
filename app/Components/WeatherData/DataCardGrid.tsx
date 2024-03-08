import React from 'react';
import DataCard from "@/app/Components/WeatherData/DataCard";
import {useSelector} from "react-redux";
import {RootState} from "@/app/Stores";
import {CurrentWeather, currentWeatherData} from "@/app/Stores/CurrentWeatherSlice";

const DataCardGrid = () => {
    const weatherData : currentWeatherData = useSelector((state:RootState): currentWeatherData => (state.currentWeather.current))
    return (
        <div className={" md:h-3/5 w-full grid grid-cols-3 max-md:grid-rows-3 grid-rows-2 gap-2 md:gap-14 p-1 md:p-4 "}>
            <DataCard Title={"Feels like"} span={"max-md:col-span-2"} Value={weatherData.apparent_temperature} unit={'°'} />
            <DataCard Title={"Humidity"} Value={weatherData.relative_humidity_2m} unit={"mm"} />
            <DataCard Title={"Snow fall"} Value={weatherData.snowfall} unit={"mm"} />
            <DataCard Title={"Precipitation"} Value={weatherData.precipitation} unit={"mm"} />
            <DataCard Title={"Rain"} Value={weatherData.rain} unit={"mm"}/>
            <DataCard Title={"Wind Speed"} span={"max-md:col-span-3"} Value={weatherData.wind_speed_10m} unit={"km/h"} />
        </div>
    );
};

export default DataCardGrid;