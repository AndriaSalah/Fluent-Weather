import React from 'react';
import DataCard from "@/app/Components/WeatherData/DataCard";

import {useAppSelector} from "@/app/Stores/Store";
import {currentWeatherData} from "@/app/Stores/CurrentWeatherSlice";

const DataCardGrid = () => {
    const weatherData : currentWeatherData = useAppSelector(state => (state.currentWeather.current))
    return (
        <div className={"max-md:h-[40%] h-1/2 md:h-3/5 w-full grid grid-cols-3 max-md:grid-cols-6 max-md:grid-rows-3 grid-rows-2 gap-2 md:gap-14 p-1 md:p-4 "}>
            <DataCard Title={"Feels like"} span={"max-md:col-span-4"} Value={weatherData.apparent_temperature} unit={'°'} />
            <DataCard Title={"Humidity"} Value={weatherData.relative_humidity_2m} span={"max-md:col-span-2"} unit={"mm"} />
            <DataCard Title={"Snow fall"} Value={weatherData.snowfall} span={"max-md:col-span-3"} unit={"mm"} />
            <DataCard Title={"Precipitation"} Value={weatherData.precipitation} span={"max-md:col-span-3"} unit={"mm"} />
            <DataCard Title={"Rain"} Value={weatherData.rain} span={"max-md:col-span-2"} unit={"mm"}/>
            <DataCard Title={"Wind Speed"} span={"max-md:col-span-4"} Value={weatherData.wind_speed_10m} unit={"km/h"} />
        </div>
    );
};

export default DataCardGrid;