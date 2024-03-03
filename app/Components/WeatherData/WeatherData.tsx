"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleExpansion } from "@/app/Stores/utilsSlice";
import { RootState } from "@/app/Stores";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import DataCardGrid from "@/app/Components/WeatherData/DataCardGrid";
import DataGraph from "@/app/Components/WeatherData/DataGraph";




const WeatherData = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: RootState) => state.utils.expand);

  function clickHandler() {
    dispatch(toggleExpansion());
    console.log("clicked");
  }

  return (
    <div
      className={`rounded-xl flex top-0 right-0 absolute w-full md:w-[65%]  
      ${!toggle ? "translate-x-[100%]" : "translate-x-0"}
       h-screen bg-[#FFFFFF7F] duration-500 items-center backdrop-blur-sm ease-in-out`}>
      <button
        onClick={clickHandler}
        className={`h-10 w-10 text-white hover:bg-black rounded-[50%] text-5xl flex items-center absolute -left-[2.5rem] ${toggle && "rotate-180" } duration-300`}>
        <MdOutlineKeyboardArrowLeft />
      </button>
      <div className={"flex flex-col flex-1 text-black items-center h-svh p-1 md:p-4 gap-2"}>
        <DataGraph/>
        <DataCardGrid/>
      </div>
    </div>
  );
};


export default WeatherData;
