import React, {useRef} from 'react';
import AutoComplete from "@/app/UI/AutoComplete";
import {FaLocationDot} from "react-icons/fa6";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {AutoGps, getWeather, resetLocationPointer, setLocationPointer} from "@/app/Stores/LocationsSlice";
import {IoRefreshOutline} from "react-icons/io5";
import AddressList from "@/app/Components/Weather/Components/WeatherHeader/AddressList";
import GpsDialog from "@/app/UI/GpsDialog";
import {DialogHandles} from "@/app/UI/GreetingDialog";


const WeatherHeader: React.FC = () => {
    const gpsDialog = useRef<DialogHandles>(null)
    const {loading, isRefreshing , locationPermState} = useAppSelector(state => state.flags)
    const {firstTime} = useAppSelector(state => state.utils)
    const {locationPointer, locationsData} = useAppSelector(state => state.locations)
    const dispatch = useAppDispatch()

    const refresh = () => {
        const lat = locationsData[locationPointer].location.lat
        const lng = locationsData[locationPointer].location.lng
        dispatch(getWeather(lat!, lng!, true))
    }

    const checkLocationPermission =  () => {
        if(locationPermState) {
            dispatch(AutoGps())
            dispatch(setLocationPointer(0))
        } else gpsDialog.current?.openDialog()
    }



    return (
        <>
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
            {!firstTime && <GpsDialog ref={gpsDialog}/>}
        </>
    );
};

export default WeatherHeader;