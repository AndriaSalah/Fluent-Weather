import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/app/Stores";

interface props {
    isDay : number
}
const SunMoon :React.FC<props> = ({isDay}) => {

    return (
        <>
            <div className={`rounded-[50%] ${isDay ? "bg-amber-400" : "bg-yellow-100"} duration-700 blur-[6px] absolute -z-10 aspect-square h-full animate-hover`}></div>
        </>
    );
};

export default SunMoon;