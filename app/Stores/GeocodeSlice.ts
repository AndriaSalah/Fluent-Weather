import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import exp from "constants";

export type geocodeData = {
    address?:string|null,
    location:{
        lat:number|null,
        lng:number|null
    }
}

const initialState :geocodeData ={
    address:null,
    location:{
        lat:null,
        lng:null
    }
}

const GeocodeSlice = createSlice({
        name: "Geocode",
        initialState,
        reducers:{
            setGeocodeData:(state:geocodeData , action:PayloadAction<geocodeData>)=>{
                console.log(action.payload)
                return action.payload
            }
        }
    }
)

export const {setGeocodeData} = GeocodeSlice.actions
export default GeocodeSlice