import {forwardRef, ReactNode, RefObject, useEffect, useImperativeHandle, useRef} from "react";

interface Props {
    children?: ReactNode;
    message: string;
    onSubmit: Function
}

export interface DialogHandles {
    openDialog: () => void;
    closeDialog: () => void;
}

const buttonStyles: string = "px-2 py-2 rounded-3xl border border-black border-opacity-15 hover:bg-blue-400 hover:text-white duration-300 w-1/4"

export const DialogBox = forwardRef<DialogHandles, Props>((props, ref) => {
    const dialog = useRef<HTMLDialogElement>(null)
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

    const cancelHandler = () =>{
        dialog.current?.close()
    }
    return (
        <>
            <dialog ref={dialog}
                    className={"w-1/2 h-1/3 border-0 rounded-card shadow-2xl p-6 backdrop:bg-transparent backdrop:backdrop-blur-sm"}>
                {props.message && <h1 className={"text-4xl"}>{props.message}</h1>}
                <form className={"flex flex-col justify-center gap-5 items-center text-center flex-1 h-2/3"} onSubmit={(e) => props.onSubmit(e)} method="dialog">
                    {props.children}
                </form>
                <div className={"flex justify-around "}>
                    <button className={buttonStyles} id={"submit"} type="button">Submit</button>
                    <button onClick={cancelHandler} className={buttonStyles} id={"cancel"} type="button">Cancel</button>
                </div>
            </dialog>
        </>
    )
})
DialogBox.displayName = "DialogBox"

export default DialogBox;