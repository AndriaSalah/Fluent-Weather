"use client"
import {useSelector} from "react-redux";
import {RootState} from "@/app/Stores";
import Clock from "@/app/Components/Weather/Clock";
import WeatherControls from "@/app/Components/Weather/WeatherControls";
import TextField from "@/app/UI/TextField";
import {FaLocationDot} from "react-icons/fa6";

const variants = {
    expanded: ""
}
const Weather = () => {

    const toggle = useSelector((state: RootState) => state.utils.expand)
    const geocodeData = useSelector((state:RootState) => state.geocode )

    return (
        <section className={`flex w-full h-full flex-col gap-56 p-6`}>
            <div className={"flex justify-between items-center"}>
                <h1 className={"text-4xl font-light text-center"}>{geocodeData ? geocodeData.address:"nope"}</h1>
                <div className={" w-1/4 flex items-center gap-5 justify-end "}>
                  <TextField/>
                    <button className={"w-[30px] h-[30px] hover:bg-white hover:text-black grid place-content-center rounded-xl text-lg"} ><FaLocationDot /></button>
                </div>
            </div>
            <div className={"flex flex-col gap-10"}>
                <WeatherControls/>
                <h2 className={"text-center text-3xl"}>Sunny</h2>
                <Clock/>
            </div>
        </section>
    );
};

Weather.propTypes = {};

export default Weather;
