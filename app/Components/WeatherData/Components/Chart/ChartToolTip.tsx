
import React from "react";
import {options} from "@/app/Stores/utilsSlice";

interface props {
    active?:boolean,
    payload? :{
        value:number
    }[]
    label?:string,
    selectedOption:options
}
export const ChartTooltip:React.FC<props> = ({active, payload, label, selectedOption}) => {
    const max_unit : string = "text-[#FF7272]"
    const min_unit : string = "text-[#5C9CE5]"
    if (active && payload && payload.length) {
        return (
            <div className="flex flex-col gap-1 rounded p-4 bg-white bg-opacity-55 outline-gray-50 outline-offset-1 ">
                <p className="label">{`${label} `}</p>
                {selectedOption==="Temp" &&
                    <>
                        <p className={max_unit} >{`Max : ${payload[0]?.value}`}&deg;</p>
                        <p className={min_unit}>{`Min : ${payload[1]?.value}`}&deg;</p>
                    </>
                }
                {
                    selectedOption==="Wind" &&
                    <>
                        <p className={min_unit}>{`Wind speed :${payload[0]?.value}`} Km/h</p>
                    </>
                }
                {
                    selectedOption==="UV" &&
                    <>
                        <p className={min_unit}>{`UV index :${payload[0]?.value}`}</p>
                    </>
                }
                {
                    selectedOption==="Rain" &&
                    <>
                        <p className={min_unit}>{`Rain :${payload[0]?.value}`}</p>
                    </>
                }
                <p className="desc"></p>
            </div>
        );
    }

    return null;
};