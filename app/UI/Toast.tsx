
import React from 'react';

interface ToastProps {
    message: string,
    type?: "error" | "success"
}

const Toast: React.FC<ToastProps> = ({message, type}) => {
    return (
        <span
            className={`${type === "error" ?
                "border-rose-400" :
                type === "success" ?
                    "border-green-300" : "border-blue-400"} 
                     font-light border bg-opacity-70 absolute text-black grid place-items-center top-5 left-1/2 -translate-x-1/2 w-5/6 md:w-1/5 h-[3rem] animate-fadeIn rounded-card shadow-card bg-white z-50`}>
            <p>{message}</p>
        </span>
    );
};

export default Toast;