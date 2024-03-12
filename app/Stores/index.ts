import { configureStore } from "@reduxjs/toolkit";
import utilsSlice, {utils} from "./utilsSlice";
import CurrentWeatherSlice, {CurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import DailyWeatherSlice, {FormattedDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import {useDispatch} from "react-redux";
import GeocodeSlice, {locationData} from "@/app/Stores/GeocodeSlice";
import StatsSlice, {flagsSlice} from "@/app/Stores/FlagsSlice";

export type RootState= {
  utils: utils,
  currentWeather: CurrentWeather,
  dailyWeather: FormattedDailyWeather[],
  geocode: locationData[],
  stats: flagsSlice,
}
export const store = configureStore({
  reducer: {
    utils: utilsSlice.reducer,
    currentWeather : CurrentWeatherSlice.reducer,
    dailyWeather : DailyWeatherSlice.reducer,
    geocode :  GeocodeSlice.reducer,
    stats: StatsSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
