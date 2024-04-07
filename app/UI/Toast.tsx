
import React from 'react';
import {useAppSelector} from "@/app/Stores/Store";


const Toast: React.FC = () => {
    const {toastType ,toastMessage} = useAppSelector(state => state.utils.toast);
    return (
        <span
            className={`${toastType === "error" ?
                "border-rose-400" :
                toastType === "success" ?
                    "border-green-300" : "border-blue-400"} 
                     font-light border absolute text-black grid place-items-center top-5 left-1/2 -translate-x-1/2 w-5/6 md:w-1/5 h-[3rem] animate-fadeIn rounded-card shadow-card bg-gray-200 z-50`}>
            <p>{toastMessage}</p>
        </span>
    );
};

export default Toast;