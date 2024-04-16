import React, {useEffect, useState} from 'react';
import {useAppSelector} from "@/app/Stores/Store";

const Clock = () => {

    const timeZone = useAppSelector(state  => state.currentWeather.timezone)
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
        updateTime();
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, [timeZone]);
    return (
       <>
           <h2 className={"text-center text-6xl md:text-8xl font-extralight z-10"}>{currentTime}</h2>
       </>
    );
};

export default Clock;