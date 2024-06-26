'use client'
import React, {useEffect, useRef, useState} from "react";
import AutoComplete from "@/app/UI/AutoComplete";
import UnderlinedText from "@/app/UI/UnderlinedText";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {setName} from "@/app/Stores/utilsSlice";
import {setFirstTime, setInitialLocationState} from "@/app/Stores/FlagsSlice";
import GpsDialog, {DialogHandles} from "@/app/UI/GpsDialog";
import {getWeather} from "@/app/Stores/LocationsSlice";
import {redirect, useRouter} from "next/navigation";


const buttonStyles: string = "px-2 py-2 rounded-3xl border border-black border-opacity-15 hover:bg-blue-400 hover:text-white duration-300 w-1/2 md:w-1/4"

export default function Greeting () {
    const gpsDialog = useRef<DialogHandles>(null)
    const nameField = useRef<HTMLInputElement>(null)
    const locations = useAppSelector(state => state.locations.locationsData)
    const {initialLocationState,firstTime} = useAppSelector(state => state.flags)
    const dispatch = useAppDispatch()
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMessage] = useState("")
    const router = useRouter()

    useEffect(() => {
        !firstTime && redirect("/")
    }, [firstTime]);

    const saveName = (name: string) => {
        if (name.length < 10 && name.length > 4) {
            console.log("test")
            dispatch(setName(name))
            dispatch(setFirstTime(false))
            router.push("/")
        }
        else displayError("Please enter a name shorter than 10 characters and less than 4 characters")
    }

    const setInitialLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (locations.length !== 0) {
            setShowError(false)
            const {lat, lng} = locations[0].location
            dispatch(getWeather(lat,lng))
            dispatch(setInitialLocationState(true))
            e.currentTarget.innerText = "Finish"
        } else {
            displayError("Please select a location")
        }
    }
    const openGpsDialog = () => gpsDialog.current?.openDialog()
    const displayError = (message: string) => {
        setErrorMessage(message)
        setShowError(true)
    }
    return (
        <>
            <main
                className={" bg-white text-black w-full h-full py-6 backdrop:bg-transparent backdrop:backdrop-blur-sm overflow-clip"}>
                <UnderlinedText text={"Hello!"} header={true}/>
                <div style={{transform: initialLocationState ? "translateX(-100%)" : ""}}
                     className={"flex h-3/4 duration-700 "}>
                    <div
                        className={"flex flex-col gap-5 w-full h-full text-center shrink-0 items-center justify-center"}>
                        <p className={"text-2xl md:text-3xl font-light"}>Welcome to <b className={"text-blue-500"}>Fluent Weather</b></p>
                        <p className={"text-lg md:text-xl font-light"}>{"Let's start by adding a location using "}<b>Search</b> or <b>GPS</b></p>
                        <AutoComplete dark={true}/>
                        <button type={"button"} onClick={openGpsDialog}
                                className={"text-[0.8rem] w-1/2 text-center text-blue-500"}>Use GPS instead ?
                        </button>
                        <div className={"h-1/4 w-full grid place-items-center"}>
                            <button onClick={setInitialLocation} className={buttonStyles} type={"button"}>Next</button>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center "}>
                        <p className={"text-lg w-4/6"}>Okay now tell me what should I call you :D</p>
                        <input ref={nameField} type={'text'} name={"name"} placeholder={"Enter your name here"}
                               className={"outline-0 border-2 border-blue-400 rounded-3xl p-2 text-center max-md:w-3/5 focus-within:max-md:w-4/5 w-1/3 focus-within:w-1/2 duration-300"}/>
                        <button onClick={() => saveName(nameField.current!.value )} className={buttonStyles} type={"submit"}>Save this name</button>
                    </div>
                </div>
                <div className={"flex justify-around items-center text-center "}>
                    <h3 className={`${showError ? "visible" : "invisible"} text-red-400`}>{errorMsg}</h3>
                </div>
            </main>
            <GpsDialog ref={gpsDialog}/>
        </>
    )
}


