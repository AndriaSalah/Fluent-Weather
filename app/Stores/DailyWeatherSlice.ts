import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toggleToast} from "@/app/Stores/utilsSlice";
import {AppDispatch} from "@/app/Stores/Store";


type ReceivedDailyWeather = {
    daily: {
        time: string[],
        temperature_2m_max: number[],
        temperature_2m_min: number[],
        uv_index_max: number[],
        wind_speed_10m_max: number[],
        rain_sum: number[]
    }
}
export type FormattedDailyWeather = {
    day: string,
    temp_max: number,
    temp_min: number,
    uv: number,
    wind_speed: number,
    rain: number
}[]
const initialState: FormattedDailyWeather = [{
    day: "",
    temp_max: 0,
    temp_min: 0,
    uv: 0,
    wind_speed: 0,
    rain: 0
}]


const dailyWeatherSlice = createSlice({
    name: "dailyWeather",
    initialState,
    reducers: {
        updateDailyWeather: (_, action: PayloadAction<FormattedDailyWeather>) => action.payload
    }
})

const {updateDailyWeather} = dailyWeatherSlice.actions
export default dailyWeatherSlice

export const getDailyWeather = (latitude : number , longitude : number ) => {
    const options: string[] = ["temperature_2m_max", "temperature_2m_min", "uv_index_max", "wind_speed_10m_max", "rain_sum"]
    const API_URL: string = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${options.toString()}&timezone=auto`
    return async (dispatch: AppDispatch) => {
        const getDailyData = async () => {
            const response = await fetch(API_URL)
            if (!response.ok) return dispatch(toggleToast("error 232: error fetching weather data ","error"))
            return await response.json()
        }
        try {
            const dailyData: ReceivedDailyWeather = await getDailyData()
            const formattedData :FormattedDailyWeather = dailyData.daily.time.map((day, index) => ({
                day: day,
                temp_min: dailyData.daily.temperature_2m_min[index],
                temp_max: dailyData.daily.temperature_2m_max[index],
                uv: dailyData.daily.uv_index_max[index],
                wind_speed: dailyData.daily.wind_speed_10m_max[index],
                rain: dailyData.daily.rain_sum[index]
            }))
            dispatch(updateDailyWeather(formattedData))
        } catch (e) {
            console.log(e)
            dispatch(toggleToast("error 204: " + e,"error"))
        }
    }
}