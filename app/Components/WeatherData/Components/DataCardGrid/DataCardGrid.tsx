import React from 'react';
import DataCard from "@/app/Components/WeatherData/Components/DataCardGrid/DataCard";

import {useAppSelector} from "@/app/Stores/Store";
import {currentWeatherData} from "@/app/Stores/CurrentWeatherSlice";

type fillValues = "FeelsLike" | "Humidity" | "Snowfall" | "Precipitation" | "Rain" | "WindSpeed"
const DataCardGrid = () => {
    const weatherData: currentWeatherData = useAppSelector(state => (state.currentWeather.current))
    const getFillValue = (type: fillValues): number => {
        switch (type) {
            case "FeelsLike" :
                return Math.min((Math.abs(weatherData.apparent_temperature) / 40) * 100, 100)
            case "Humidity" :
                return weatherData.relative_humidity_2m
            case "Snowfall" :
                return Math.min((weatherData.snowfall / 70) * 100, 100)
            case "Precipitation" :
                return Math.min((weatherData.precipitation / 50) * 100, 100)
            case "Rain":
                return Math.min((weatherData.rain / 50) * 100, 100)
            case "WindSpeed" :
                return weatherData.wind_speed_10m
            default :
                return 0
        }

    }
    return (
        <div
            className={"max-md:h-[40%] h-1/2 md:h-3/5 w-full grid grid-cols-3 max-md:grid-cols-6 max-md:grid-rows-3 grid-rows-2 gap-2 md:gap-14 p-1 md:p-4 "}>
            <DataCard Title={"Feels like"} span={"max-md:col-span-4"} Value={weatherData.apparent_temperature}
                      unit={'°'} fillValue={getFillValue("FeelsLike")}/>
            <DataCard Title={"Humidity"} Value={weatherData.relative_humidity_2m} span={"max-md:col-span-2"} unit={"%"}
                      fillValue={getFillValue("Humidity")}/>
            <DataCard Title={"Snow fall"} Value={weatherData.snowfall} span={"max-md:col-span-3"} unit={"mm"}
                      fillValue={getFillValue("Snowfall")}/>
            <DataCard Title={"Precipitation"} Value={weatherData.precipitation} span={"max-md:col-span-3"} unit={"mm"}
                      fillValue={getFillValue("Precipitation")}/>
            <DataCard Title={"Rain"} Value={weatherData.rain} span={"max-md:col-span-2"} unit={"mm"}
                      fillValue={getFillValue("Rain")}/>
            <DataCard Title={"Wind Speed"} span={"max-md:col-span-4"} Value={weatherData.wind_speed_10m} unit={"km/h"}
                      fillValue={getFillValue("WindSpeed")}/>
        </div>
    );
};

export default DataCardGrid;