import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {resetWeatherEffects, setWeatherEffects} from "@/app/Stores/CurrentWeatherSlice";
import {
    FaCloud, FaCloudBolt,
    FaCloudMoon,
    FaCloudMoonRain, FaCloudShowersHeavy, FaCloudShowersWater,
    FaCloudSun,
    FaCloudSunRain,
    FaCloudversify,
    FaMoon, FaSnowflake,
    FaSun
} from "react-icons/fa6";

const WeatherDescription = () => {
    const [weatherDescription, setWeatherDescription] = useState<string>("...")
    const [weatherIcon, setWeatherIcon] = useState<React.ReactElement>()
    const {name} = useAppSelector(state => state.utils)
    const {initialLoad} = useAppSelector(state => state.flags)
    const {weather_code, is_day} = useAppSelector(state => state.currentWeather.current)
    const dispatch = useAppDispatch()
    const updateWeatherDescription = useCallback(() => {
        if(!initialLoad) {
            dispatch(resetWeatherEffects())
            switch (weather_code) {
                case 0:
                    setWeatherDescription("clear Sky")
                    is_day ? setWeatherIcon(<FaSun/>) : setWeatherIcon(<FaMoon/>)
                    break
                case 1:
                    setWeatherDescription("Mainly clear")
                    is_day ? setWeatherIcon(<FaCloudSun/>) : <FaCloudMoon/>
                    break
                case 2:
                    setWeatherDescription("partly cloudy")
                    is_day ? setWeatherIcon(<FaCloudSun/>) : <FaCloudMoon/>
                    dispatch(setWeatherEffects({
                        type: "cloud",
                        level: 1
                    }))
                    break
                case 3:
                    setWeatherDescription("Overcast")
                    setWeatherIcon(<FaCloud/>)
                    dispatch(setWeatherEffects({
                        type: "cloud",
                        level: 2
                    }))
                    break
                case 45:
                    setWeatherDescription("Fog")
                    setWeatherIcon(<FaCloudversify/>)
                    break
                case 48:
                    setWeatherDescription("Depositing rime fog")
                    setWeatherIcon(<FaCloudversify/>)
                    break
                case 51:
                    setWeatherDescription("Light drizzle")
                    is_day ? setWeatherIcon(<FaCloudSunRain/>) : setWeatherIcon(<FaCloudMoonRain/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 1
                    }))
                    break
                case 53:
                    setWeatherDescription("Moderate drizzle")
                    is_day ? setWeatherIcon(<FaCloudSunRain/>) : setWeatherIcon(<FaCloudMoonRain/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 2
                    }))
                    break
                case 55:
                    setWeatherDescription("Heavy drizzle")
                    is_day ? setWeatherIcon(<FaCloudSunRain/>) : setWeatherIcon(<FaCloudMoonRain/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 3
                    }))
                    break
                case 61:
                    setWeatherDescription("Slight rain")
                    setWeatherIcon(<FaCloudShowersHeavy/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 4
                    }))
                    break
                case 63:
                    setWeatherDescription("Moderate rain")
                    setWeatherIcon(<FaCloudShowersHeavy/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 5
                    }))
                    break
                case 65:
                    setWeatherDescription("Heavy rain")
                    setWeatherIcon(<FaCloudShowersHeavy/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 6
                    }))
                    break
                case 66:
                    setWeatherDescription("Slight freezing rain")
                    setWeatherIcon(<FaCloudShowersHeavy/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 6
                    }))
                    break
                case 67:
                    setWeatherDescription("Heavy freezing rain")
                    setWeatherIcon(<FaCloudShowersHeavy/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 6
                    }))
                    break
                case 71:
                    setWeatherDescription("Light snow fall")
                    setWeatherIcon(<FaSnowflake/>)
                    dispatch(setWeatherEffects({
                        type: "snow",
                        level: 1
                    }))
                    break
                case 73:
                    setWeatherDescription("Moderate snow fall")
                    setWeatherIcon(<FaSnowflake/>)
                    dispatch(setWeatherEffects({
                        type: "snow",
                        level: 2
                    }))
                    break
                case 75:
                    setWeatherDescription("Heavy snow fall")
                    setWeatherIcon(<FaSnowflake/>)
                    dispatch(setWeatherEffects({
                        type: "snow",
                        level: 3
                    }))
                    break
                case 77:
                    setWeatherDescription("Snow grains")
                    setWeatherIcon(<FaSnowflake/>)
                    dispatch(setWeatherEffects({
                        type: "snow",
                        level: 3
                    }))
                    break
                case 80:
                    setWeatherDescription("Slight rain showers")
                    setWeatherIcon(<FaCloudShowersWater/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 7
                    }))
                    break
                case 81:
                    setWeatherDescription("Moderate rain showers")
                    setWeatherIcon(<FaCloudShowersWater/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 8
                    }))
                    break
                case 82:
                    setWeatherDescription("Violent rain showers")
                    setWeatherIcon(<FaCloudShowersWater/>)
                    dispatch(setWeatherEffects({
                        type: "rain",
                        level: 9
                    }))
                    break
                case 85:
                    setWeatherDescription("Slight snow showers")
                    setWeatherIcon(<FaSnowflake/>)
                    dispatch(setWeatherEffects({
                        type: "snow",
                        level: 2
                    }))
                    break
                case 86:
                    setWeatherDescription("Heavy snow showers")
                    setWeatherIcon(<FaSnowflake/>)
                    dispatch(setWeatherEffects({
                        type: "snow",
                        level: 3
                    }))
                    break
                case 95:
                case 96:
                case 99:
                    setWeatherDescription("Thunderstorm")
                    setWeatherIcon(<FaCloudBolt/>)
                    break
                default:
                    setWeatherDescription("...")
            }
        }
    }, [dispatch,is_day,weather_code,initialLoad])

    useEffect(() => {
        updateWeatherDescription()
    }, [updateWeatherDescription]);

    return (
        <div className={"z-10"}>
            <p className={"text-center text-lg"}>Hello <b>{name}</b> {"today's weather is,"}</p>
            <h2 className={"flex items-center justify-center gap-5 text-center text-3xl"}>{weatherDescription} {weatherIcon}</h2>
        </div>
    );
};

export default WeatherDescription;