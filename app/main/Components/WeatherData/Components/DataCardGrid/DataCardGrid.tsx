import React from 'react';
import {useAppSelector} from "@/app/Stores/Store";
import {currentWeatherData} from "@/app/Stores/CurrentWeatherSlice";
import DataCard from "@/app/main/Components/WeatherData/Components/DataCardGrid/DataCard";
import {FaCloudRain, FaCloudShowersHeavy, FaDroplet, FaSnowflake, FaTemperatureEmpty, FaWind} from "react-icons/fa6";

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
                return Math.min((weatherData.wind_speed_10m / 40) * 100, 100)
            default :
                return 0
        }

    }
    return (
        <div
            className={"max-md:h-[40%] h-1/2 md:h-3/5 w-full grid grid-cols-3 max-md:grid-cols-6 max-md:grid-rows-3 grid-rows-2 gap-2 md:gap-6 p-1 md:p-4 "}>
            <DataCard Title={"Feels like"} span={"max-md:col-span-4"} Value={weatherData.apparent_temperature}
                      unit={'°'} fillValue={getFillValue("FeelsLike")}
                      icon={<FaTemperatureEmpty/>}/>
            <DataCard Title={"Humidity"} Value={weatherData.relative_humidity_2m} span={"max-md:col-span-2"} unit={"%"}
                      fillValue={getFillValue("Humidity")}
                      icon={<FaDroplet/>}/>
            <DataCard Title={"Snow fall"} Value={weatherData.snowfall} span={"max-md:col-span-3"} unit={"mm"}
                      fillValue={getFillValue("Snowfall")}
                      icon={<FaSnowflake/>}/>
            <DataCard Title={"Precipitation"} Value={weatherData.precipitation} span={"max-md:col-span-3"} unit={"mm"}
                      fillValue={getFillValue("Precipitation")}
                      icon={<FaCloudRain/>}/>
            <DataCard Title={"Rain"} Value={weatherData.rain} span={"max-md:col-span-2"} unit={"mm"}
                      fillValue={getFillValue("Rain")}
                      icon={<FaCloudShowersHeavy/>}/>
            <DataCard Title={"Wind Speed"} span={"max-md:col-span-4"} Value={weatherData.wind_speed_10m} unit={"km/h"}
                      fillValue={getFillValue("WindSpeed")}
                      icon={<FaWind/>}/>
        </div>
    );
};

export default DataCardGrid;