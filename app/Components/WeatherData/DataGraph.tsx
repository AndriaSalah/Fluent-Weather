import React, {useEffect, useState} from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useSelector} from "react-redux";
import {FormattedDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import {RootState, useAppDispatch} from "@/app/Stores";
import {ChartTooltip} from "@/app/Components/WeatherData/ChartToolTip";
import Dropdown from "@/app/Components/WeatherData/Dropdown/Dropdown";
import {changeSelectedOption, options} from "@/app/Stores/utilsSlice";

const Colors = {
    Gradient_max: "#ea8282",
    Gradient_min: "#5C9CE5",
    Gradient_start : "#464545",
    Tick_color: 'black',
    StrokeColor_1 : "#5C9CE5",
    StrokeColor_2 : "#ea8282"
}
type dataKeys = "temp_min" | "uv" | "wind_speed" | "rain"
const DataGraph = () => {
    const Daily_Data = useSelector((state:RootState) => state.dailyWeather )
    const SelectedOption = useSelector((state:RootState) => state.utils.selectedOption )
    const [dataKey,setDataKey] = useState<dataKeys>("temp_min")
    const dispatch = useAppDispatch()
    function log(){
        console.log(Daily_Data[0])
    }
    const onDropDownChange = (option:options)=>{
        dispatch(changeSelectedOption(option))
    }
    useEffect(() => {
        SelectedOption === "Temp" ? setDataKey("temp_min")
            :SelectedOption === "UV" ? setDataKey("uv")
                :SelectedOption === "Wind" ? setDataKey("wind_speed")
                    :SelectedOption === "Rain" && setDataKey("rain")
    }, [SelectedOption]);
    return (
        <div className={"h-2/6 md:h-1/2 w-full p-1 md:p-4 "} onClick={log}>
            <Dropdown defaultOption={"Temp"} options={["Temp","Wind","Rain","UV"]} onChange={onDropDownChange} />
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
                                   SelectedOption === "Temp" ? (unit + '°') : unit)}
                        />
                        <CartesianGrid strokeLinecap={"round"} stroke={"black"} opacity={0.1}/>
                        <Tooltip content={<ChartTooltip selectedOption={SelectedOption}/>}/>
                        <Area type="monotone" dataKey={dataKey}
                              stroke={Colors.StrokeColor_1} fillOpacity={0.8}
                              fill="url(#colorMin)"/>
                        {SelectedOption === "Temp" &&  <Area type="monotone" dataKey={"temp_max"} stroke={Colors.StrokeColor_2} fillOpacity={0.8}
                               fill="url(#colorMax)"/>}
                    </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DataGraph;