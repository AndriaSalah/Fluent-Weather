"use client"
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/app/Stores";
import Clock from "@/app/Components/Weather/Clock";
import WeatherControls from "@/app/Components/Weather/WeatherControls";
import TextField from "@/app/UI/TextField";
import {FaLocationDot} from "react-icons/fa6";
import React from "react";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import {GeocodeCords} from "@/app/Stores/GeocodeSlice";







const Weather  = () => {
    const {locationPointer} = useSelector((state: RootState) => state.utils)
    const geocodeData = useSelector((state:RootState) => state.geocode )
    const dispatch = useAppDispatch()
    const checkLocationPermission = async () => {
        try {
            const result = await navigator.permissions.query({ name: 'geolocation' });
            if (result.state === 'prompt' || 'granted') {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('Location permission granted');
                        // User has granted permission
                        const {latitude, longitude} = position.coords;
                        dispatch(GeocodeCords(latitude,longitude))
                        // dispatch(getCurrentWeather(latitude,longitude))
                        // dispatch(getDailyWeather(latitude,longitude))
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // Handle location retrieval error
                    }
                );
            } else if (result.state === 'denied') {
                console.log('Location permission denied');
            }
        } catch (error) {
            console.error('Error checking location permission:', error);
        }
    };
    return (
        <section className={`flex w-full h-full flex-col gap-56 p-6`}>
            <header className={"flex justify-between items-center"}>
                <h1 className={" w-2/3 text-4xl font-light"}>{geocodeData.length !== 0 ? geocodeData[locationPointer].address:"nope"}</h1>
                <div className={"w-1/3 flex items-center gap-5 justify-end "}>
                  <TextField/>
                    <button onClick={checkLocationPermission} className={"w-[30px] h-[30px] hover:bg-white hover:text-black grid place-content-center rounded-xl text-lg"} ><FaLocationDot /></button>
                </div>
            </header>
            <div className={"flex flex-col gap-10"}>
                <WeatherControls/>
                <h2 className={"text-center text-3xl"}>Sunny</h2>
                <Clock/>
            </div>
        </section>
    );
};

Weather.propTypes = {};

export default Weather;
