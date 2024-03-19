import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {stat} from "fs";

export type flagsSlice = {
    initialLocationState :boolean,
    loading:boolean,
    initialLoad:boolean,
    transition:boolean
}
const initialState : flagsSlice = {
    initialLocationState:false,
    loading:true,
    initialLoad:true,
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
            state.loading = action.payload
        },
        toggleTransition : (state : flagsSlice , action : PayloadAction<boolean>) =>{
            state.transition = action.payload
        },
        disableInitialLoad : (state : flagsSlice) =>{
            state.initialLoad = false
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
    disableInitialLoad,
    toggleTransition
} = StatsSlice.actions

export default StatsSlice