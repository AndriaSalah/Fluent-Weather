import React from "react";
import {useAppSelector} from "@/app/Stores/Store";
import ViewWeatherDataButton from "@/app/UI/ViewWeatherDataButton";
import DataGraph from "@/app/main/Components/WeatherData/Components/Chart/DataGraph";
import DataCardGrid from "@/app/main/Components/WeatherData/Components/DataCardGrid/DataCardGrid";
const WeatherData = () => {
  const toggle = useAppSelector(state => state.utils.expand);
    const {is_day} = useAppSelector(state => state.currentWeather.current);
  return (
    <div
      className={`rounded-xl flex top-0 right-0 absolute w-full md:w-[80%] lg:w-[65%] z-10 
      ${!toggle ? "max-md:translate-y-[60rem] md:translate-x-full" : "max-md:translate-y-[0%]  md:translate-x-0"}
       h-screen ${is_day? "bg-white" : "bg-gray-700"} bg-opacity-65 duration-500 items-center backdrop-blur-sm ease-in-out`}>
        <ViewWeatherDataButton/>
      <div className={"flex w-full flex-col text-black items-center h-svh p-2 md:p-4 gap-2"}>
        <DataGraph/>
        <DataCardGrid/>
      </div>
    </div>
  );
};


export default WeatherData;
