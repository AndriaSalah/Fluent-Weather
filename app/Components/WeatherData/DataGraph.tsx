import React, {useEffect} from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useSelector} from "react-redux";
import {FormattedDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import {RootState, useAppDispatch} from "@/app/Stores";
import {ChartTooltip} from "@/app/Components/WeatherData/ChartToolTip";

const Colors = {
    Gradient_max: "#ea8282",
    Gradient_min: "#5C9CE5",
    Gradient_start : "#464545",
    Tick_color: 'black',
    StrokeColor_1 : "#ea8282",
    StrokeColor_2 : "#5C9CE5"
}
const DataGraph = () => {
    const Daily_Data = useSelector((state:RootState) => state.dailyWeather )
    const SelectedOption = useSelector((state:RootState) => state.utils.selectedOption )
    const dispatch = useAppDispatch()
    function log(){
        console.log(Daily_Data[0])
    }
    return (
        <div className={"flex-1 w-full p-4 "} onClick={log}>
            <ResponsiveContainer className={" bg-[#FFFFFF7F] rounded-xl backdrop-blur-3xl"}>
                    <AreaChart data={Daily_Data}
                               margin={{top: 45, right: 45, left: 20, bottom: 45}}>
                        <defs>
                            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor={Colors.Gradient_max} stopOpacity={0.9}/>
                                <stop offset="95%" stopColor={Colors.Gradient_start} stopOpacity={0.3}/>
                            </linearGradient>
                            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor={Colors.Gradient_min} stopOpacity={0.9}/>
                                <stop offset="95%" stopColor={Colors.Gradient_start} stopOpacity={0.3}/>
                            </linearGradient>
                        </defs>
                        <XAxis height={10} tickLine={false} axisLine={false} dataKey="day"
                               tickFormatter={(date) => {
                                   const split = date.split("-")
                                   return `${split[2]}/${split[1]}`
                               }} orientation={"top"}
                               tick={{fill: Colors.Tick_color , fillOpacity: 0.8}}/>
                        <YAxis width={35} padding={{top: 30}} axisLine={false} tickLine={false}
                               tick={{fill: Colors.Tick_color , fillOpacity: 0.8}}
                               tickFormatter={(unit) => (
                                   SelectedOption === "temp" ? (unit + '°') : unit)}
                        />
                        <CartesianGrid strokeLinecap={"round"} stroke={"black"} opacity={0.1}/>
                        <Tooltip content={<ChartTooltip selectedOption={SelectedOption}/>}/>
                        <Area type="monotone" dataKey={"temp_min"} stroke={Colors.StrokeColor_1} fillOpacity={0.8}
                              fill="url(#colorMin)"/>
                        <Area type="monotone" dataKey={"temp_max"} stroke={Colors.StrokeColor_2} fillOpacity={0.8}
                              fill="url(#colorMax)"/>
                    </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DataGraph;