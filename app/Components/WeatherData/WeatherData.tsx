import React from "react";
import { toggleExpansion } from "@/app/Stores/utilsSlice";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import DataCardGrid from "@/app/Components/WeatherData/Components/DataCardGrid/DataCardGrid";
import DataGraph from "@/app/Components/WeatherData/Components/Chart/DataGraph";

const WeatherData = () => {
  const dispatch = useAppDispatch();
  const toggle = useAppSelector(state => state.utils.expand);

  function clickHandler() {
    dispatch(toggleExpansion());

  }

  return (
    <div
      className={`rounded-xl flex top-0 right-0 absolute w-full md:w-[65%] z-10 
      ${!toggle ? "max-md:translate-y-[60rem] md:translate-x-full" : "max-md:translate-y-[0%]  md:translate-x-0"}
       h-screen bg-[#FFFFFF7F] duration-500 items-center backdrop-blur-sm ease-in-out`}>
      <button
        onClick={clickHandler}
        className={`h-10 w-10 text-white bg-white bg-opacity-50 backdrop-blur-3xl rounded-[50%] text-5xl flex items-center
         fixed max-md:hidden md:-left-[3.5rem] 
         ${toggle && "md:rotate-180" } duration-300`}>
        <MdOutlineKeyboardArrowLeft />
      </button>
      <div className={"flex w-full flex-col text-black items-center h-lvh p-2 md:p-4 gap-2"}>
        <DataGraph/>
        <DataCardGrid/>
      </div>
    </div>
  );
};


export default WeatherData;
