import './Snow.scss'
import React from "react";
import {useAppSelector} from "@/app/Stores/Store";

interface props{
    isSnowy:number
}
export const Snow: React.FC<props> = ({isSnowy}) => {
    const snowFlakes = new Array(Math.min(isSnowy,3)*16).fill(null)
    const transition = useAppSelector(state => state.flags.transition);
    return (
        isSnowy > 0 &&
        <div className={`SnowWrapper ${transition && "hidden"}`}>
            {snowFlakes.map((_,index)=> <div key={index} className="snowflake"></div>)}
        </div>
    )
}