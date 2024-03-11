import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type statsSlice = {
    gpsState :boolean|null,
    loading:boolean
}
const initialState : statsSlice = {
    gpsState:null,
    loading:false
}
const StatsSlice = createSlice({
    name:"Stats",
    initialState,
    reducers:{
        setGpsState : (state : statsSlice , action :PayloadAction<boolean>) => {
            state.gpsState = action.payload
        },
        setLoading : (state : statsSlice , action :PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const {
    setGpsState,
    setLoading
} = StatsSlice.actions

export default StatsSlice