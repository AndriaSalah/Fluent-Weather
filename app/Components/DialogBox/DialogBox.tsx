import React, {forwardRef, ReactNode, RefObject, useEffect, useImperativeHandle, useRef, useState} from "react";
import TextField from "@/app/UI/TextField";
import UnderlinedText from "@/app/UI/UnderlinedText";
import {RootState, useAppDispatch} from "@/app/Stores";
import {setFirstTime, setName} from "@/app/Stores/utilsSlice";
import {useSelector} from "react-redux";

interface Props {
    children?: ReactNode;
    message?: string;
    onSubmit: Function
}

export interface DialogHandles {
    openDialog: () => void;
    closeDialog: () => void;
}

const buttonStyles: string = "px-2 py-2 rounded-3xl border border-black border-opacity-15 hover:bg-blue-400 hover:text-white duration-300 w-1/4"

export const DialogBox = forwardRef<DialogHandles, Props>((props, ref) => {
    const dialog = useRef<HTMLDialogElement>(null)
    const [next,setNext] = useState(false)
    const locations = useSelector((state:RootState)=> state.geocode.length)
    const dispatch = useAppDispatch()
    const [showError , setShowError]= useState(false)
    const [errorMsg , setErrorMessage]= useState("")
    interface FormElements extends HTMLFormControlsCollection {
        name: HTMLInputElement
    }

    interface FormElement extends HTMLFormElement {
        readonly elements: FormElements
    }
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
    const handleNameSubmit = (e:React.FormEvent<FormElement>)=> {
        e.preventDefault()
        let name : string = e.currentTarget.elements.name.value
        if(name !== ""){
            dispatch(setName(name))
            dispatch(setFirstTime(false))
            setShowError(false)
            cancelHandler()
        }
        else{
            error("Please enter a name")
        }
    }
    const goToNext =  (e:React.MouseEvent<HTMLButtonElement>) => {
        if(locations !== 0) {
            setNext(true)
            setShowError(false)
            e.currentTarget.innerText="Finish"
        }
        else {
            error("Please select a location")
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
                <form onSubmitCapture={(event:React.FormEvent<FormElement>)=>handleNameSubmit(event)} style={{transform:next? "translateX(-100%)" : ""}} className={"flex  h-1/2 duration-700 "}
                      onSubmit={(e) => props.onSubmit(e)} method="dialog">
                    <div className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center"}>
                        <p className={"text-xl font-light"}>{"Let's start by searching for a place"}</p>
                        <TextField dark={true}/>
                        <button className={"text-[0.8rem] w-1/2 text-center text-blue-700"}>Use location instead ?</button>
                    </div>
                    <div className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center "}>
                        <p className={"text-lg w-4/6"}>Okay now tell me what should I call you :D</p>
                        <input type={'text'} name={"name"} placeholder={"Enter your name here"} className={"outline-0 border-2 border-blue-400 rounded-3xl p-2 text-center max-md:w-3/5 focus-within:max-md:w-4/5 w-1/3 focus-within:w-1/2 duration-300"} />
                        <button type={"submit"}>Save this name ?</button>
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
DialogBox.displayName = "DialogBox"

export default DialogBox;