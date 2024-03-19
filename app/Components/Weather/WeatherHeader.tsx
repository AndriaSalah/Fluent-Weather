import React, {useRef} from 'react';
import TextField from "@/app/UI/TextField";
import {FaAngleDown, FaLocationDot} from "react-icons/fa6";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {GeocodeCords, getWeather, removeLocation, setLocationPointer} from "@/app/Stores/LocationsSlice";
import DropList from "@/app/Components/Weather/DropList";
import {setLocationListIsOpened} from "@/app/Stores/utilsSlice";
import {IoRefreshOutline} from "react-icons/io5";


interface props {
    openGpsDialog: () => void
}

const WeatherHeader: React.FC<props> = ({openGpsDialog}) => {
    const {locationListIsOpen} = useAppSelector(state => state.utils)
    const {locationPointer, locationsData} = useAppSelector(state => state.locations)
    const loading = useAppSelector(state => state.flags.loading)
    const listRef = useRef<HTMLUListElement>(null)
    const dispatch = useAppDispatch()

    const changeLocation = (locationPointer: number) => {
        dispatch(setLocationPointer(locationPointer))
        dispatch(setLocationListIsOpened(false))
    }
    const deleteLocation = (locationPointer: number) => {
        dispatch(removeLocation(locationPointer))
    }
    const toggleList = () => locationsData.length > 1 &&  dispatch(setLocationListIsOpened(!locationListIsOpen))
    const locationListUnFocus = (e: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(e.target as Node)) dispatch(setLocationListIsOpened(false))
    }
    const refresh = ()=> {
        const lat = locationsData[locationPointer].location.lat
        const lng = locationsData[locationPointer].location.lng
        dispatch(getWeather(lat!,lng!))
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
            <div onClick={toggleList}
                 className={"flex cursor-pointer items-center max-md:justify-center justify-start gap-2.5 relative max-md:w-full w-1/4"}>
                <h1 className={"max-md:text-center w-fit text-4xl font-light"}>{locationsData.length !== 0 ? locationsData[locationPointer].address : "..."}</h1>
                {locationsData.length > 1 &&
                    <>
                        <FaAngleDown
                            className={`text-2xl ${locationListIsOpen ? "rotate-180" : "rotate-0"} duration-300`}/>
                        <DropList ref={listRef} listData={locationsData} isOpen={locationListIsOpen}
                                  onSelect={changeLocation}
                                  onButtonClick={deleteLocation} onUnFocus={locationListUnFocus}/>
                    </>
                }
            </div>
            <div className={"max-md:w-full w-1/3 flex items-center gap-1.5 max-md:flex-col"}>
                <div className={"max-md:w-full flex-1 flex items-center gap-5 justify-center md:justify-end  "}>
                    <TextField/>

                    <button onClick={checkLocationPermission}
                            className={"w-[30px] h-[30px] hover:bg-white hover:text-black grid place-content-center rounded-xl text-lg"}>
                        <FaLocationDot/></button>
                </div>
                <button onClick={refresh}
                        className={`w-[30px] h-[30px] hover:bg-white hover:text-black grid place-content-center rounded-xl text-lg ${loading && "animate-spin"}`}>
                    <IoRefreshOutline/></button>
            </div>
        </header>
    );
};

export default WeatherHeader;