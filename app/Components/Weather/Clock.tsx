import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/Stores";

const Clock = () => {

    const timeZone = useSelector((state : RootState) => state.currentWeather.timezone)
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            if (timeZone !== "") {
                const currentDate = new Date();
                const formattedTime = new Intl.DateTimeFormat('en-US', {
                    timeZone,
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric',
                }).format(currentDate);
                setCurrentTime(formattedTime);
            }
        }

        // Update time immediately and then every minute
        updateTime();
        const intervalId = setInterval(updateTime, 60000); // Update every minute

        // Clean up the interval to avoid memory leaks
        return () => clearInterval(intervalId);
    }, [timeZone]);
    return (
       <>
           <h2 className={"text-center text-6xl md:text-8xl font-extralight z-10"}>{currentTime}</h2>
       </>
    );
};

export default Clock;