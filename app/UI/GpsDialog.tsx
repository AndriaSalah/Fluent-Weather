import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import UnderlinedText from "@/app/UI/UnderlinedText";
import Image from "next/image";
import locationImage from "@/public/img.png"
import {AutoGps} from "@/app/Stores/LocationsSlice";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {setInitialLocationState} from "@/app/Stores/FlagsSlice";
import {FaX} from "react-icons/fa6";


export interface DialogHandles {
    openDialog: () => void;
    closeDialog: () => void;
}

const buttonStyles: string = "px-2 py-2 rounded-3xl border border-black border-opacity-15 hover:bg-blue-400 hover:text-white duration-300 w-1/2 md:w-1/4"

export const GpsDialog = forwardRef<DialogHandles>(({}, ref) => {
    const dialog = useRef<HTMLDialogElement>(null)
    const [next, setNext] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMessage] = useState("")
    const {locationPermState} = useAppSelector(state => state.flags)
    const dispatch = useAppDispatch()
    useImperativeHandle(ref, () => ({
            openDialog() {
                dialog.current && dialog.current.showModal()
            },
            closeDialog() {
                dialog.current && dialog.current.close()
            }
        })
    )


    const goToNext = () => {
        if (!next) {
            setNext(true)
            setShowError(false)
        } else if (next) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    // User has granted permission
                    dispatch(AutoGps())
                    dispatch(setInitialLocationState(true))
                    dialog.current?.close()
                },
                (error) => {
                    console.error('Error getting location:', error);
                    Error("Location Permission was denied")
                }
            );
        }

    }
    const cancelHandler = () => {
        dialog.current?.close()
    }
    const Error = (message: string) => {
        setErrorMessage(message)
        setShowError(true)
    }
    return (
        <>
            {!locationPermState &&
                <dialog ref={dialog}
                        className={"w-full h-2/3 md:w-1/2 md:h-1/2 border-4 border-blue-400 rounded-card shadow-2xl py-6 backdrop:bg-transparent backdrop:backdrop-blur-sm overflow-clip"}>
                    <div className={"flex items-center justify-between px-2"}>
                        <UnderlinedText text={"GPS"} header={true}/>
                        <button onClick={cancelHandler}
                                className={"mr-2 grid place-items-center hover:bg-red-400 w-10 h-10 rounded-xl text-xl duration-300 "}>
                            <FaX/></button>
                    </div>
                    <form style={{transform: next ? "translateX(-100%)" : ""}} className={"flex  h-1/2 duration-700 "}
                          method="dialog">
                        <div
                            className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center"}>
                            <h2 className={"w-4/5"}>In order to detect your current location , we need access to your
                                location data from your browser</h2>
                        </div>
                        {!showError ?
                            <div
                                className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center"}>
                                <h2 className={"w-4/5"}>By continuing, the browser will ask you for a permission to
                                    let us access to
                                    your location data , please press allow</h2>
                                <Image src={locationImage} alt={"example of the location permission"}/>
                            </div>
                            :
                            <div
                                className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center"}>
                                <h2 className={"w-4/5 font-bold"}>{errorMsg}</h2>
                                <p>Please follow the instruction on the following website to unblock the permission</p>
                                <a className={"text-blue-700 font-bold"}
                                   href={"https://whatismyipaddress.com/enabling-and-disabling-geolocation-on-your-browser"}>How to unblock
                                    location access</a>
                                <p>After following these steps please refresh the page</p>
                            </div>
                        }
                    </form>
                    {!showError &&
                        <div className={"flex flex-col h-1/4 justify-around items-center "}>
                            <button onClick={goToNext} className={buttonStyles} id={"submit"} type="submit">Next
                            </button>
                        </div>
                    }
                </dialog>}
        </>
    )
})
GpsDialog.displayName = "DialogBox"

export default GpsDialog;