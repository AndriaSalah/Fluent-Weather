import { configureStore } from "@reduxjs/toolkit";
import utilsSlice from "./utilsSlice";
import CurrentWeatherSlice from "@/app/Stores/CurrentWeatherSlice";
import DailyWeatherSlice from "@/app/Stores/DailyWeatherSlice";
import {useDispatch} from "react-redux";
import GeocodeSlice from "@/app/Stores/GeocodeSlice";

export type RootState= {
  utils: {
    expand: boolean,
    selectedOption: string
  },
  currentWeather: {
    timezone: string,
    current: {
      time: string,
      temperature_2m: number,
      relative_humidity_2m: number,
      apparent_temperature: number,
      is_day: number,
      wind_speed_10m: number,
      precipitation: number,
      weather_code: number,
      rain: number,
      snowfall: number
    }
  },
  dailyWeather: {
    day: string,
    temp_max: number,
    temp_min: number,
    uv: number,
    wind_speed: number,
    rain: number
  }[],
  geocode: {
    address?: string | null,
    location: {
      lat: number | null,
      lng: number | null
    }
  }
}
export const store = configureStore({
  reducer: {
    utils: utilsSlice.reducer,
    currentWeather : CurrentWeatherSlice.reducer,
    dailyWeather : DailyWeatherSlice.reducer,
    geocode :  GeocodeSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
