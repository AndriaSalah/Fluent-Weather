import React from 'react';


interface props {
    isDay : number
}
const SunMoon :React.FC<props> = ({isDay}) => {

    return (
        <>
            <div className={`rounded-[50%] ${isDay ? "bg-amber-400" : "bg-yellow-100"} duration-700  absolute -z-10 aspect-square h-5/6 md:h-[11rem] animate-hover`}></div>
        </>
    );
};

export default SunMoon;