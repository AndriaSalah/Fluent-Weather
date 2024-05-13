import React, {ReactElement} from 'react';
import Wave from "@/app/UI/Waves";
import {useAppSelector} from "@/app/Stores/Store";

interface props {
    Title: String,
    Value: number,
    fillValue: number,
    unit: String,
    span?: string
    icon: React.ReactNode
}

const DataCard: React.FC<props> = ({Title, Value, fillValue, unit, span = "", icon}) => {
    const {is_day} = useAppSelector(state => state.currentWeather.current);
    return (

        <div
            className={`${span} shadow-card rounded-card bg-white bg-opacity-5 backdrop-blur-3xl flex justify-center flex-col p-4 relative`}>
            <div className={`flex items-center justify-between  ${is_day ? "text-black" : "text-white"} `}>
                <p className={`text-md md:text-2xl`}>{Title}</p>
                <i className={"text-xl"}>{icon}</i>
            </div>
            <div className={`grid place-items-center flex-1 ${is_day ? "text-black" : "text-white"}`}>
                <p className={"text-xl md:text-4xl text-center font-bold"}>{Value}<span
                    className={`${unit !== '°' && "text-lg"} font-medium`}>{unit}</span></p>
            </div>
            {fillValue > 0 && <span className={`block fixed w-full bottom-0 left-0 rounded-card -z-10`}
                                    style={{height: fillValue + "%"}}>
            <Wave/>
            </span>}
        </div>
    );
};

export default DataCard;