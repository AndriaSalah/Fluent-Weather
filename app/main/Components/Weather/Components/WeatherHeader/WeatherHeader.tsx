import React, {useRef} from 'react';
import AutoComplete from "@/app/UI/AutoComplete";
import {FaLocationDot} from "react-icons/fa6";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {AutoGps, getWeather, setLocationPointer} from "@/app/Stores/LocationsSlice";
import GpsDialog from "@/app/UI/GpsDialog";
import {DialogHandles} from "@/app/UI/GpsDialog";
import AddressList from "@/app/main/Components/Weather/Components/WeatherHeader/AddressList";
import {MdOutlineRefresh} from "react-icons/md";


const WeatherHeader: React.FC = () => {
    const gpsDialog = useRef<DialogHandles>(null)
    const {loading, isRefreshing , useGPS , firstTime} = useAppSelector(state => state.flags)
    const {locationPointer, locationsData} = useAppSelector(state => state.locations)
    const dispatch = useAppDispatch()

    const refresh = () => {
        const lat = locationsData[locationPointer].location.lat
        const lng = locationsData[locationPointer].location.lng
        dispatch(getWeather(lat, lng, true))
    }

    const getCurrentLocation =  () => {
        if(useGPS) {
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
                        <button disabled={loading} onClick={getCurrentLocation}
                                className={"w-[30px] h-[30px] hover:bg-white hover:text-black grid place-content-center rounded-xl text-lg duration-300"}>
                            <FaLocationDot/></button>
                    </div>
                    <button onClick={refresh}
                            disabled={isRefreshing}
                            className={`w-[30px] h-[30px] hover:bg-white hover:text-black grid place-content-center rounded-xl text-2xl ${isRefreshing && "animate-spin duration-300"}`}>
                        <MdOutlineRefresh/></button>
                </div>
            </header>
            {!firstTime && !useGPS && <GpsDialog ref={gpsDialog}/>}
        </>
    );
};

export default WeatherHeader;