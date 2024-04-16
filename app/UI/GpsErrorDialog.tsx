import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import UnderlinedText from "@/app/UI/UnderlinedText";
import AutoComplete from "@/app/UI/AutoComplete";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import {setInitialLocationState} from "@/app/Stores/FlagsSlice";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";

interface Props {
    message?: string;
    custom?: boolean;
}

export interface DialogHandles {
    openDialog: () => void;
    closeDialog: () => void;
}
const buttonStyles: string = "px-2 py-2 rounded-3xl border border-black border-opacity-15 hover:bg-blue-400 hover:text-white duration-300 w-1/2 md:w-1/4"
export const GpsErrorDialog = forwardRef<DialogHandles, Props>((props, ref) => {
    const dialog = useRef<HTMLDialogElement>(null)
    const locations = useAppSelector(state => state.locations.locationsData)
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMessage] = useState("")
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

    const goToNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (locations.length !== 0) {
            const {lat, lng} = locations[0].location
            dispatch(getCurrentWeather(lat!, lng!))
            dispatch(getDailyWeather(lat!, lng!))
            dispatch(setInitialLocationState(true))
            e.currentTarget.innerText = "Finish"
        } else {
            error("Please select a location")
        }
    }
    const error = (message: string) => {
        setErrorMessage(message)
        setShowError(true)
    }
    return (
        <dialog ref={dialog}
                className={" w-full h-5/6 md:w-4/6 md:h-4/6 border-4 border-blue-400 rounded-card shadow-2xl py-6 backdrop:bg-transparent backdrop:backdrop-blur-sm overflow-clip"}>
            {props.message && <UnderlinedText text={props.message} header={true}/>}
            <form className={"flex h-3/4"} method="dialog">
                <div
                    className={"flex flex-col gap-5 w-full h-full text-center shrink-0 items-center justify-center"}>
                    <p className={"text-xl font-light p-4"}>{"We ran into an error locating you , and you didnt have any saved locations , lets add one now"}</p>
                    <AutoComplete dark={true}/>
                    <h3 className={`${showError ? "visible" : "invisible"} text-red-400`}>{errorMsg}</h3>
                </div>
            </form>
        </dialog>
    );
});
GpsErrorDialog.displayName="GpsErrorDialog"

