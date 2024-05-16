import React, {useEffect, useState} from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {changeSelectedOption, options} from "@/app/Stores/utilsSlice";
import Dropdown from "@/app/main/Components/WeatherData/Dropdown/Dropdown";
import {ChartTooltip} from "@/app/main/Components/WeatherData/Components/Chart/ChartToolTip";


type dataKeys = "temp_min" | "uv" | "wind_speed" | "rain"
const DataGraph = () => {
    const Daily_Data = useAppSelector(state => state.dailyWeather )
    const {is_day} = useAppSelector(state => state.currentWeather.current)
    const SelectedOption = useAppSelector(state => state.utils.selectedOption )
    const [dataKey,setDataKey] = useState<dataKeys>("temp_min")
    const dispatch = useAppDispatch()

    const Colors = {
        Gradient_max: "#ea8282",
        Gradient_min: "#5C9CE5",
        Gradient_start : "#464545",
        Tick_color: is_day ?  'black' : 'white',
        StrokeColor_min : "#5C9CE5",
        StrokeColor_max : "#ea8282"
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
        <div className={"grid gap-1 max-sm:h-[38%] md:h-2/3 w-full p-1 md:p-4 "}>
            <Dropdown darkMode={!is_day} defaultOption={"Temp"} options={["Temp", "Wind", "Rain", "UV"]} onChange={onDropDownChange}/>
            <ResponsiveContainer className={" bg-white bg-opacity-5 rounded-xl backdrop-blur-3xl"}>
                    <AreaChart data={Daily_Data}
                               margin={{top: 35, right: 35, left: 15, bottom: 30}}>
                        <defs>
                            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor={Colors.Gradient_min} stopOpacity={0.9}/>
                                <stop offset="95%" stopColor={Colors.Gradient_start} stopOpacity={0.3}/>
                            </linearGradient>
                            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor={Colors.Gradient_max} stopOpacity={0.9}/>
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
                        {SelectedOption === "Temp" &&  <Area type="monotone" dataKey={"temp_max"} stroke={Colors.StrokeColor_max} fillOpacity={0.8}
                                                             fill="url(#colorMax)"/>}
                        <Area type="monotone" dataKey={dataKey}
                              stroke={Colors.StrokeColor_min} fillOpacity={0.8}
                              fill="url(#colorMin)"/>
                    </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DataGraph;