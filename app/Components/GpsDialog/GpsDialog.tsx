import React, {forwardRef, ReactNode, RefObject, useEffect, useImperativeHandle, useRef, useState} from "react";
import UnderlinedText from "@/app/UI/UnderlinedText";
import Image from "next/image";
import locationImage from "@/public/img.png"
import {GeocodeCords} from "@/app/Stores/GeocodeSlice";
import {useAppDispatch} from "@/app/Stores";
import {setInitialLocationState} from "@/app/Stores/FlagsSlice";


interface Props {
    children?: ReactNode;
    message?: string;
}

export interface DialogHandles {
    openDialog: () => void;
    closeDialog: () => void;
}

const buttonStyles: string = "px-2 py-2 rounded-3xl border border-black border-opacity-15 hover:bg-blue-400 hover:text-white duration-300 w-1/4"

export const GpsDialog = forwardRef<DialogHandles, Props>((props, ref) => {
    const dialog = useRef<HTMLDialogElement>(null)
    const [next,setNext] = useState(false)
    const [showError , setShowError]= useState(false)
    const [errorMsg , setErrorMessage]= useState("")
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
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                event.preventDefault();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const goToNext =  (e:React.MouseEvent<HTMLButtonElement>) => {
        if(!next) {
            setNext(true)
            setShowError(false)
            e.currentTarget.innerText="Ask for permission"
        }
        else if(next){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // User has granted permission
                    const {latitude, longitude} = position.coords;
                    dispatch(GeocodeCords(latitude,longitude))
                    dispatch(setInitialLocationState(true))
                    dialog.current?.close()
                },
                (error) => {
                    console.error('Error getting location:', error);
                    // Handle location retrieval error
                }
            );
        }

    }
    const cancelHandler = () => {
        dialog.current?.close()
    }
    const error = (message : string) =>{
        setErrorMessage(message)
        setShowError(true)
    }
    return (
        <>
            <dialog ref={dialog}
                    className={"w-full h-2/3 md:w-1/2 md:h-1/2 border-4 border-blue-400 rounded-card shadow-2xl py-6 backdrop:bg-transparent backdrop:backdrop-blur-sm overflow-clip"}>
                {props.message && <UnderlinedText text={props.message} header={true}/>}
                <form style={{transform:next? "translateX(-100%)" : ""}} className={"flex  h-1/2 duration-700 "} method="dialog">
                    <div className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center"}>
                        <h2 className={"w-4/5"}>In order to detect your current location , we need access to the location permission from your browser</h2>
                    </div>
                    <div className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center"}>
                        <h2 className={"w-4/5"}>By pressing the button below, the browser will ask you for the permission , please press allow</h2>
                        <Image src={locationImage} alt={"example of the location permission"}/>
                    </div>
                </form>
                <div className={"flex flex-col h-1/4 justify-around items-center "}>
                    <h3 className={`${showError ? "visible":"invisible"} text-red-400`}>{errorMsg}</h3>
                    <button onClick={goToNext} className={buttonStyles} id={"submit"} type="submit">Next</button>
                </div>
            </dialog>
        </>
    )
})
GpsDialog.displayName = "DialogBox"

export default GpsDialog;