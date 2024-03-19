import {configureStore} from "@reduxjs/toolkit";
import utilsSlice from "./utilsSlice";
import CurrentWeatherSlice from "@/app/Stores/CurrentWeatherSlice";
import DailyWeatherSlice from "@/app/Stores/DailyWeatherSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import LocationsSlice from "@/app/Stores/LocationsSlice";
import StatsSlice from "@/app/Stores/FlagsSlice";


export const store = configureStore({
  reducer: {
    utils: utilsSlice.reducer,
    currentWeather : CurrentWeatherSlice.reducer,
    dailyWeather : DailyWeatherSlice.reducer,
    locations :  LocationsSlice.reducer,
    flags: StatsSlice.reducer
  },
});

export type RootState= ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
