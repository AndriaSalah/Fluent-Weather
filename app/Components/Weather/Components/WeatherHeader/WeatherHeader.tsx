"use client"
import React from 'react';
import AutoComplete from "@/app/UI/AutoComplete";
import {FaLocationDot} from "react-icons/fa6";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {GeocodeCords, getWeather} from "@/app/Stores/LocationsSlice";
import {IoRefreshOutline} from "react-icons/io5";
import {setIsRefreshing} from "@/app/Stores/FlagsSlice";
import AddressList from "@/app/Components/Weather/Components/WeatherHeader/AddressList";
interface props {
    openGpsDialog: () => void
}

const WeatherHeader: React.FC<props> = ({openGpsDialog}) => {
    const {loading, isRefreshing} = useAppSelector(state => state.flags)
    const {locationPointer, locationsData} = useAppSelector(state => state.locations)
    const dispatch = useAppDispatch()

    const refresh = () => {
        dispatch(setIsRefreshing(true))
        const lat = locationsData[locationPointer].location.lat
        const lng = locationsData[locationPointer].location.lng
        dispatch(getWeather(lat!, lng!))
    }

    const checkLocationPermission = async () => {
        try {
            const result = await navigator.permissions.query({name: 'geolocation'});
            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('Location permission granted');
                        // User has granted permission
                        const {latitude, longitude} = position.coords;
                        dispatch(GeocodeCords(latitude, longitude))
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // Handle location retrieval error
                    }
                );
            } else if (result.state === 'denied') {
                console.log('Location permission denied');
            } else if (result.state === 'prompt') {
                openGpsDialog()
            }
        } catch (error) {
            console.error('Error checking location permission:', error);
        }
    };


    return (
        <header className={"flex max-md:flex-col max-md:gap-5 justify-between items-center z-40 "}>
            <AddressList/>
            <div className={"max-md:w-full w-1/3 flex items-center gap-1.5 max-md:flex-col"}>
                <div className={"max-md:w-full flex-1 flex items-center gap-5 justify-center md:justify-end  "}>
                    <AutoComplete/>
                    <button disabled={loading} onClick={checkLocationPermission}
                            className={"w-[30px] h-[30px] hover:bg-white hover:text-black grid place-content-center rounded-xl text-lg duration-300"}>
                        <FaLocationDot/></button>
                </div>
                <button onClick={refresh}
                        disabled={isRefreshing}
                        className={`w-[30px] h-[30px] hover:bg-white hover:text-black grid place-content-center rounded-xl text-lg ${isRefreshing && "animate-spin duration-300"}`}>
                    <IoRefreshOutline/></button>
            </div>
        </header>
    );
};

export default WeatherHeader;