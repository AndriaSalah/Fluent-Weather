import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {stat} from "fs";

export type flagsSlice = {
    initialLocationState :boolean,
    loading:boolean,
    transition:boolean
}
const initialState : flagsSlice = {
    initialLocationState:false,
    loading:true,
    transition:true
}
const StatsSlice = createSlice({
    name:"Stats",
    initialState,
    reducers:{
        setInitialLocationState : (state : flagsSlice , action :PayloadAction<boolean>) => {
            state.initialLocationState = action.payload
            localStorage.setItem("initialLocationState",JSON.stringify(state.initialLocationState))
        },
        setLoading : (state : flagsSlice , action :PayloadAction<boolean>) => {
            console.log("setLoading" + action.payload )
            state.loading = action.payload
        },
        toggleTransition : (state : flagsSlice , action : PayloadAction<boolean>) =>{
            state.transition = action.payload
            console.log(state.transition)
        }

    }
})

export const hydrateInitialLocationState = ()=>{
    return async (dispatch:Dispatch) =>{
        const initialLocationState : boolean =JSON.parse(localStorage.getItem("initialLocationState") ?? "false")
        dispatch(setInitialLocationState(initialLocationState))
    }
}
export const {
    setInitialLocationState,
    setLoading,
    toggleTransition
} = StatsSlice.actions

export default StatsSlice