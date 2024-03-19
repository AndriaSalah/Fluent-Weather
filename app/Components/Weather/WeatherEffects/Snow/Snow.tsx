import './Snow.scss'
import React from "react";
import {useAppSelector} from "@/app/Stores/Store";

interface props{
    isSnowy:number
}
export const Snow: React.FC<props> = ({isSnowy}) => {
    const transition = useAppSelector(state => state.flags.transition);
    return (
        isSnowy > 0 &&
        <div className={`SnowWrapper ${transition && "hidden"}`}>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            {
                isSnowy > 1 &&
                <>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                </>
            }
            {
                isSnowy > 2 &&
                <>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                </>
            }
        </div>
    )
}