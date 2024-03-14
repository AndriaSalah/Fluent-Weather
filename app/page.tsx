"use client"
import Weather from "./Components/Weather/Weather";
import WeatherData from "./Components/WeatherData/WeatherData";
import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/app/Stores";
import GreetingDialog, {DialogHandles} from "@/app/Components/GreetingDialog/GreetingDialog";
import {loadFromLocalStorage} from "@/app/Stores/GeocodeSlice";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import {hydrateUserFromLocal, toggleExpansion} from "@/app/Stores/utilsSlice";
import GpsDialog from "@/app/Components/GpsDialog/GpsDialog";
import {hydrateInitialLocationState, toggleTransition} from "@/app/Stores/FlagsSlice";


let transitionTimer : any

export default function Home() {
    const greetingDialog = useRef<DialogHandles>(null)
    const gpsDialog = useRef<DialogHandles>(null)
    const isDay = useSelector((state: RootState) => state.currentWeather.current.is_day)
    const {expand,firstTime ,locationPointer} = useSelector((state: RootState) => state.utils);
    const {loading , transition} = useSelector((state: RootState) => state.flags);
    const dispatch = useAppDispatch()

    function clickHandler() {
        dispatch(toggleExpansion());
    }

    useEffect(() => {
        dispatch(loadFromLocalStorage());
        dispatch(hydrateUserFromLocal())
        dispatch(hydrateInitialLocationState())
        firstTime && greetingDialog.current?.openDialog();
    }, [dispatch,firstTime]);

    useEffect(() => {
        console.log(transitionTimer)
        if(!transitionTimer){
        dispatch(toggleTransition())
        transitionTimer = setTimeout(()=> dispatch(toggleTransition()),700)
        return ()=> {
            clearTimeout(transitionTimer)
            transitionTimer = null
        }
        }
    }, [dispatch,locationPointer]);

    return (
        <>
            <GreetingDialog openGpsDialog={()=> {gpsDialog.current?.openDialog()}} message={"Hello!"} onSubmit={() => {}} ref={greetingDialog}/>
            <GpsDialog message={"GPS"} ref={gpsDialog}/>
            <main className={`w-full h-[100svh] bg-no-repeat bg-cover ${transition? "bg-black" : isDay? "bg-day" : "bg-night"} duration-100`}>
                <span
                    className={`block w-full h-screen absolute bg-black ${transition ? "opacity-100" : isDay ? "bg-opacity-10" : "bg-opacity-55"} duration-300`}/>
                {loading? <p>loading</p> :  <div>
                    <Weather openGpsDialog={() => gpsDialog.current?.openDialog()}/>
                    <WeatherData/>
                    <button
                        onClick={clickHandler}
                        className={`h-10 w-10 text-white backdrop-blur-3xl rounded-[50%] text-5xl flex items-center z-30
         fixed bottom-2 right-[50vw] translate-x-1/2 md:hidden 
         ${expand ? "-rotate-90 bg-black bg-opacity-50 " : "rotate-90 bg-white bg-opacity-50 "}  duration-200`}>
                        <MdOutlineKeyboardArrowLeft/>
                    </button>
                </div>}
            </main>
        </>
    );
}
