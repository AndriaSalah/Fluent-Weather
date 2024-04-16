import React, {useEffect, useState} from 'react';
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {updateLeftButton, updateRightButton} from "@/app/Stores/utilsSlice";
import {decLocationPointer, getWeather, incLocationPointer} from "@/app/Stores/LocationsSlice";
import {setIsRefreshing, setLoading} from "@/app/Stores/FlagsSlice";
import SunMoon from "@/app/main/Components/Weather/Components/WeatherControls/SunMoon";


const WeatherControls = () => {
    const [refreshInterval, setRefreshInterval] = useState<any>(null)
    const {locationPointer, locationsData} = useAppSelector(state => state.locations)
    const {leftButtonEnabled, rightButtonEnabled} = useAppSelector(state => state.utils)
    const weather = useAppSelector(state => state.currentWeather)
    const {firstTime} = useAppSelector(state => state.flags)
    const isDay = useAppSelector(state => state.currentWeather.current.is_day)
    const dispatch = useAppDispatch()

    const increaseLocationPointer = () => {
        if (locationPointer + 1 > locationsData.length - 1) return
        dispatch(incLocationPointer())

    }
    const decreaseLocationPointer = () => {
        if (locationPointer - 1 < 0) return
        dispatch(decLocationPointer())

    }

    useEffect(() => {
        const getWeatherDelay = (delay: number, lat: number, lng: number, refresh?: boolean) => {
            refresh ? dispatch(setIsRefreshing(true)) : dispatch(setLoading(true))
            setTimeout(() => {
                dispatch(getWeather(lat!, lng!))
            }, delay)
        }
        if (locationsData.length > 0 && !firstTime) {
            const {lat, lng} = locationsData[locationPointer].location
            getWeatherDelay(400, lat, lng)
            !refreshInterval && setRefreshInterval(setInterval(() => {
                getWeatherDelay(400, lat, lng, true)
            }, 10 * 60000))
        }
        if (locationsData.length > 1) {
            dispatch(updateRightButton(locationPointer + 1 <= locationsData.length - 1))
            dispatch(updateLeftButton(locationPointer - 1 >= 0))
        } else {
            dispatch(updateRightButton(false))
            dispatch(updateLeftButton(false))
        }
        return () => {
            clearInterval(refreshInterval)
            setRefreshInterval(null)
        }
    }, [dispatch, firstTime, locationPointer, locationsData]);
    return (
        <div className={"flex items-center justify-center gap-10 md:gap-20 relative max-md:h-[24vh] md:h-[20vh]"}>
            <SunMoon isDay={isDay}/>
            <div className={"w-[3rem] md:w-[5rem] flex-shrink-0"}>
                <button onClick={() => {
                    decreaseLocationPointer()
                }} className={`text-5xl md:text-7xl ${!leftButtonEnabled && "hidden"}`}><MdOutlineKeyboardArrowLeft/>
                </button>
            </div>
            <h2 className={`text-5xl md:text-6xl font-light ${!isDay && "text-black"}`}>{weather.current.temperature_2m}&deg;</h2>
            <div className={"w-[3rem] md:w-[5rem] flex-shrink-0"}>
                <button onClick={() => {
                    increaseLocationPointer()
                }} className={`text-5xl md:text-7xl ${!rightButtonEnabled && "hidden"}`}><MdOutlineKeyboardArrowRight/>
                </button>
            </div>
        </div>
    );
};

export default WeatherControls;