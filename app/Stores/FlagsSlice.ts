import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {stat} from "fs";

export type flagsSlice = {
    initialLocationState :boolean,
    loading:boolean,
    transition:boolean
}
const initialState : flagsSlice = {
    initialLocationState:false,
    loading:false,
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
        loading : (state : flagsSlice , action :PayloadAction<boolean>) => {
            console.log("loading" + action.payload )
            state.loading = action.payload
        },
        toggleTransition : (state : flagsSlice) =>{
            state.transition = !state.transition
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
    loading,
    toggleTransition
} = StatsSlice.actions

export default StatsSlice