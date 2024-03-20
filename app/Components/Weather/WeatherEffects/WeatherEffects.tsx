import React from 'react';
import {Rain} from "@/app/Components/Weather/WeatherEffects/Rain/Rain";
import {Snow} from "@/app/Components/Weather/WeatherEffects/Snow/Snow";
import Clouds from "@/app/Components/Weather/WeatherEffects/Clouds/Clouds";
import {useAppSelector} from "@/app/Stores/Store";
const WeatherEffects = () => {
    const {snowLevel ,rainLevel,cloudLevel} = useAppSelector(state => state.currentWeather)
    return (
       <>
           <Rain isRaining={rainLevel}/>
           <Snow isSnowy={snowLevel}/>
           <Clouds isCloudy={cloudLevel}/>
       </>
    );
};

export default WeatherEffects;