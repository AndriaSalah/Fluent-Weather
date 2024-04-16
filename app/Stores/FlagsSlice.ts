import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";



export type flagsSlice = {
    initialLocationState :boolean,
    loading:boolean,
    initialLoad:boolean,
    transition:boolean,
    isRefreshing:boolean
    useGPS:boolean|null,
    gpsError:boolean
    isSavedLocationsLoaded:boolean,
    firstTime: boolean | null
}
const initialState : flagsSlice = {
    initialLocationState:false,
    loading:true,
    initialLoad:true,
    transition:true,
    isRefreshing:false,
    useGPS:null,
    gpsError:false,
    isSavedLocationsLoaded:false,
    firstTime: null
}
const StatsSlice = createSlice({
    name:"flags",
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
        setUseGps : (state : flagsSlice , action : PayloadAction<boolean>) => {
            state.useGPS = action.payload
            localStorage.setItem("useGPS",JSON.stringify(action.payload))
        },
        setGpsError : (state : flagsSlice , action:PayloadAction<boolean>) => {
            state.gpsError = action.payload
        },
        savedLocationsLoaded : (state : flagsSlice) => {
            state.isSavedLocationsLoaded = true
        },
        setFirstTime: (state: flagsSlice, action: PayloadAction<boolean>) => {
            state.firstTime = action.payload
            localStorage.setItem("firstTime", JSON.stringify(action.payload))
        },
    }
})

export const hydrateFlags = ()=>{
    return (dispatch:Dispatch) =>{
        const initialLocationState : boolean = JSON.parse(localStorage.getItem("initialLocationState") ?? "false")
        const useGPS : boolean = JSON.parse(localStorage.getItem("useGPS") ?? "false")
        const firstTime : boolean = JSON.parse(localStorage.getItem("firstTime") ?? "true")
        dispatch(setInitialLocationState(initialLocationState))
        dispatch(setUseGps(useGPS))
        dispatch(setFirstTime(firstTime))
    }
}

export const {
    setInitialLocationState,
    setLoading,
    disableInitialLoad,
    toggleTransition,
    setIsRefreshing,
    setUseGps,
    setGpsError,
    savedLocationsLoaded,
    setFirstTime
} = StatsSlice.actions

export default StatsSlice