import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "@/app/Stores/Store";
import useCheckLocationPerm from "@/app/Utils/useCheckLocationPerm";

export type flagsSlice = {
    initialLocationState :boolean,
    loading:boolean,
    initialLoad:boolean,
    transition:boolean,
    isRefreshing:boolean
    locationPermState:boolean
}
const initialState : flagsSlice = {
    initialLocationState:false,
    loading:true,
    initialLoad:true,
    transition:true,
    isRefreshing:false,
    locationPermState:false
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
        },
        setIsRefreshing: (state : flagsSlice , action:PayloadAction<boolean>) => {
            state.isRefreshing = action.payload
        },
        setLocationPermissionState:(state :flagsSlice , action :PayloadAction<boolean>) => {
            state.locationPermState = action.payload
        }

    }
})

export const hydrateInitialLocationState = ()=>{
    return (dispatch:Dispatch) =>{
        const initialLocationState : boolean = JSON.parse(localStorage.getItem("initialLocationState") ?? "false")
        dispatch(setInitialLocationState(initialLocationState))
    }
}
export const hydrateLocationPermState = () => {
    return async (dispatch:AppDispatch) => {
        const checkLocationPermState = useCheckLocationPerm()
        const locationPermState = await checkLocationPermState()
        dispatch(setLocationPermissionState(locationPermState!))
    }
}
export const {
    setInitialLocationState,
    setLoading,
    disableInitialLoad,
    toggleTransition,
    setIsRefreshing,
    setLocationPermissionState
} = StatsSlice.actions

export default StatsSlice