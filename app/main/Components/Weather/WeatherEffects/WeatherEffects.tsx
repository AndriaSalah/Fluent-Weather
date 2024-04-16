import React from 'react';
import {useAppSelector} from "@/app/Stores/Store";
import {Rain} from "@/app/main/Components/Weather/WeatherEffects/Rain/Rain";
import {Snow} from "@/app/main/Components/Weather/WeatherEffects/Snow/Snow";
import Clouds from "@/app/main/Components/Weather/WeatherEffects/Clouds/Clouds";
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