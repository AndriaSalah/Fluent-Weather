import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toggleToast} from "@/app/Stores/utilsSlice";
import {AppDispatch} from "@/app/Stores/Store";

export type currentWeatherData ={
        time: string,
        temperature_2m: number,
        relative_humidity_2m: number,
        apparent_temperature: number,
        is_day: number,
        wind_speed_10m: number,
        precipitation: number,
        weather_code: number|null,
        rain: number,
        snowfall: number
}
export type weatherEffects = {
    level:number,
    type:"cloud" | "rain" | "snow" | "reset"
}
export type CurrentWeather = {
    timezone: string,
    current: currentWeatherData,
    cloudLevel:number,
    rainLevel:number,
    snowLevel:number
}

const initialState : CurrentWeather = {
    timezone:"",
    current:{
        time: "",
        temperature_2m: 0,
        relative_humidity_2m: 0,
        apparent_temperature: 0,
        is_day: 0,
        wind_speed_10m: 0,
        precipitation: 0,
        weather_code: null,
        rain: 0,
        snowfall: 0
    },
    cloudLevel:0,
    rainLevel:0,
    snowLevel:0

}

const CurrentWeatherSlice = createSlice({
    name: "CurrentWeather",
    initialState,
    reducers: {
        updateWeather : (state : CurrentWeather , action:PayloadAction<CurrentWeather>)=>{
            state.current = action.payload.current
            state.timezone = action.payload.timezone
        },
        setWeatherEffects : (state:CurrentWeather , action:PayloadAction<weatherEffects>) => {
            switch (action.payload.type){
                case "rain":
                    state.rainLevel = action.payload.level
                    return
                case "cloud":
                    state.cloudLevel = action.payload.level
                    return
                case "snow":
                    state.snowLevel = action.payload.level
                    return
            }
        },
        resetWeatherEffects : (state:CurrentWeather) =>{
            state.snowLevel = 0
            state.rainLevel = 0
            state.cloudLevel = 0
        }
    },
});

export const {
    updateWeather ,
    setWeatherEffects,
    resetWeatherEffects
} = CurrentWeatherSlice.actions
export default CurrentWeatherSlice

export const getCurrentWeather =  (latitude : number , longitude : number) =>{
    const options : string[] = ["temperature_2m","relative_humidity_2m","apparent_temperature","is_day","wind_speed_10m","precipitation","weather_code","rain","snowfall"]
    const API_URL : string = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${options.toString()}&timezone=auto`
    return async (dispatch:AppDispatch)=>{
        const getCurrentData = async ()=>{
            const response  = await fetch(API_URL)
            if (!response.ok) return dispatch(toggleToast("error 323: error fetching weather data ","error"))
            return await response.json()
        }
        try {
            const CurrentWeather : CurrentWeather = await getCurrentData()
            dispatch(updateWeather(CurrentWeather))
        }
        catch (e){
            dispatch(toggleToast("error 304: " + e,"error"))
        }

    }

}

