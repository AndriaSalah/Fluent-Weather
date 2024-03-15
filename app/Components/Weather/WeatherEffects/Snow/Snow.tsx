import './Snow.scss'
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/Stores";

interface props{
    isSnowy:number
}
export const Snow: React.FC<props> = ({isSnowy}) => {
    const transition = useSelector((state: RootState) => state.flags.transition);
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