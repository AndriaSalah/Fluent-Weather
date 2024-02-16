import React from 'react';
import DataCard from "@/app/Components/WeatherData/DataCard";
import {useSelector} from "react-redux";
import {RootState} from "@/app/Stores";
import {CurrentWeather, currentWeatherData} from "@/app/Stores/CurrentWeatherSlice";

const DataCardGrid = () => {
    const weatherData : currentWeatherData = useSelector((state:RootState): currentWeatherData => (state.currentWeather.current))
    return (
        <div className={"flex-1 w-full  grid grid-cols-3 grid-rows-2 gap-14 p-4 "}>
            <DataCard Title={"Feels like"} Value={weatherData.apparent_temperature} unit={'°'} />
            <DataCard Title={"Humidity"} Value={weatherData.relative_humidity_2m} unit={"mm"} />
            <DataCard Title={"Precipitation"} Value={weatherData.precipitation} unit={"mm"} />
            <DataCard Title={"Wind Speed"} Value={weatherData.wind_speed_10m} unit={"km/h"} />
            <DataCard Title={"Snow fall"} Value={weatherData.snowfall} unit={"mm"} />
            <DataCard Title={"Rain"} Value={weatherData.rain} unit={"mm"} />
        </div>
    );
};

export default DataCardGrid;