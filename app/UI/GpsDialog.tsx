import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import UnderlinedText from "@/app/UI/UnderlinedText";
import Image from "next/image";
import locationImage from "@/public/img.png"
import {AutoGps} from "@/app/Stores/LocationsSlice";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {FaX} from "react-icons/fa6";
import {setInitialLocationState} from "@/app/Stores/FlagsSlice";


export interface DialogHandles {
    openDialog: () => void;
    closeDialog: () => void;
}

const buttonStyles: string = "px-2 py-2 rounded-3xl border border-black border-opacity-15 hover:bg-blue-400 hover:text-white duration-300 w-1/2 md:w-[20vw]"

export const GpsDialog = forwardRef<DialogHandles>(({}, ref) => {
    const dialog = useRef<HTMLDialogElement>(null)
    const [next, setNext] = useState(false)
    const {useGPS, gpsError} = useAppSelector(state => state.flags)
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
        } else if (next) {
            dispatch(AutoGps())
        }
    }

    const cancelHandler = () => {
        dialog.current?.close()
    }
    return (
        <>
            {!useGPS &&
                <dialog ref={dialog}
                        className={"w-full h-5/6 md:w-2/3 md:h-2/3 2xl:w-1/2 2xl:h-1/2 border-4 border-blue-400 rounded-card shadow-2xl py-6 backdrop:bg-transparent backdrop:backdrop-blur-sm overflow-clip"}>
                    <div className={"h-1/6 flex items-center justify-between px-2"}>
                        <UnderlinedText text={"GPS"} header={true}/>
                        <button onClick={cancelHandler}
                                className={"mr-2 grid place-items-center hover:bg-red-400 w-10 h-10 rounded-xl text-xl duration-300 "}>
                            <FaX/></button>
                    </div>
                    {!gpsError ?
                        <form style={{transform: next ? "translateX(-100%)" : ""}}
                              className={"flex h-5/6 duration-700 "}
                              method="dialog">
                            <div
                                className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center"}>
                                <h2 className={"w-4/5"}>In order to detect your current location , we need access to
                                    your
                                    location data from your browser</h2>
                                <div className={"w-full flex flex-col h-1/4 justify-around items-center "}>
                                    <button onClick={goToNext} className={buttonStyles} id={"button"} type="button">Next
                                    </button>
                                </div>
                            </div>
                            <div
                                className={"flex h-full flex-col gap-5 w-full text-center shrink-0 items-center justify-center"}>
                                <h2 className={"w-4/5"}>By continuing, the browser will ask you for a permission to
                                    let us access to
                                    your location data , please press allow</h2>
                                <Image src={locationImage} alt={"example of the location permission"}/>
                                <button onClick={goToNext} className={buttonStyles} id={"button"} type="button">
                                    Ask for permission
                                </button>
                            </div>
                        </form> :
                        <div
                            className={"flex flex-col gap-5 w-full text-center items-center justify-center max-md:p-4 h-4/6"}>
                            <h2 className={"w-4/5 font-bold"}>Location Permission Denied</h2>
                            <p>Please follow the instruction on the following website to unblock the permission</p>
                            <a className={"text-blue-700 font-bold"}
                               href={"https://whatismyipaddress.com/enabling-and-disabling-geolocation-on-your-browser"}>How
                                to unblock
                                location access</a>
                            <p>After following these steps please refresh the page</p>
                        </div>
                    }
                </dialog>}
        </>
    )
})
GpsDialog.displayName = "DialogBox"

export default GpsDialog;