import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import exp from "constants";
import {json} from "stream/consumers";

export type locationData = {
    address?:string|null,
    location:{
        lat:number|null,
        lng:number|null
    }
}


const initialState :locationData[] = []
const GeocodeSlice = createSlice({
        name: "Geocode",
        initialState,
        reducers:{
            setGeocodeData:(state:locationData[] , action:PayloadAction<locationData>)=>{
                const newLocationsData = [action.payload , ...state ]
                localStorage.setItem("locations",JSON.stringify(newLocationsData))
                return newLocationsData
            },
            hydrateGeocodeData:(state:locationData[] , action:PayloadAction<locationData[]>)=>{
                return action.payload
            }
        }
    }
)

export const loadFromLocalStorage = () => {
    return (dispatch :Dispatch) =>{
        const previousData : locationData[] = JSON.parse(localStorage.getItem("locations") ?? "[]")
        dispatch(hydrateGeocodeData(previousData))
    }
}

export const {setGeocodeData,hydrateGeocodeData} = GeocodeSlice.actions
export default GeocodeSlice