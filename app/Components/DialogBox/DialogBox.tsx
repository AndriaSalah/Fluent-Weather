import React, {forwardRef, ReactNode, RefObject, useEffect, useImperativeHandle, useRef, useState} from "react";
import TextField from "@/app/UI/TextField";

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
    useImperativeHandle(ref, () => ({
            openDialog() {
                dialog.current && dialog.current.showModal()
            },
            closeDialog() {
                dialog.current && dialog.current.close()
            }
        })
    )
    // useEffect(() => {
    //     const handleKeyDown = (event: KeyboardEvent) => {
    //         if (event.keyCode === 27) {
    //             event.preventDefault();
    //         }
    //     };
    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);
    const goToNext =  () => setNext(true)
    const cancelHandler = () => {
        dialog.current?.close()
    }
    return (
        <>
            <dialog ref={dialog}
                    className={"w-full h-2/3 md:w-1/2 md:h-1/2 rounded-card shadow-2xl  py-6 backdrop:bg-transparent backdrop:backdrop-blur-sm overflow-clip"}>
                {props.message && <h1 className={"ml-4 text-4xl"}>{props.message}</h1>}
                <form style={{transform:next? "translateX(-100%)" : ""}} className={"flex flex-1 h-2/3 duration-700 "}
                      onSubmit={(e) => props.onSubmit(e)} method="dialog">
                    <div className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center"}>
                        <p className={"text-lg"}>{"Let's start by searching for a place"}</p>
                        <TextField dark={true}/>
                        <button className={"text-[0.8rem] w-1/2 text-center text-blue-700"}>Use location instead ?</button>
                    </div>
                    <div className={"flex flex-col gap-5 w-full text-center shrink-0 items-center justify-center "}>
                        <p className={"text-lg w-4/6"}>Okay now tell me what should I call you :D</p>
                        <input type={'text'} placeholder={"Enter your name here"} className={"outline-0 border-2 border-blue-400 rounded-3xl p-2 text-center max-md:w-3/5 focus-within:max-md:w-4/5 w-1/3 focus-within:w-1/2 duration-300"} />
                    </div>
                </form>
                <div className={"flex justify-around "}>
                    <button onClick={goToNext} className={buttonStyles} id={"submit"} type="button">Next</button>
                    <button onClick={cancelHandler} className={buttonStyles} id={"cancel"} type="button">Cancel</button>
                </div>
            </dialog>
        </>
    )
})
DialogBox.displayName = "DialogBox"

export default DialogBox;