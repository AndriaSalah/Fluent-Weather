import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import exp from "constants";
import {json} from "stream/consumers";

export type locationData = {
    address?: string | null,
    location: {
        lat: number | null,
        lng: number | null
    }
}
type GeocodeReturn = {
    results: [
        {
            formatted_address: string,
            geometry: {
                location: {
                    lat: number | null,
                    lng
                        :
                        number | null
                }
            }
        }
    ]
}

const initialState: locationData[] = []
const GeocodeSlice = createSlice({
        name: "Geocode",
        initialState,
        reducers: {
            setGeocodeData: (state: locationData[], action: PayloadAction<locationData>) => {
                const newLocationsData = [action.payload, ...state]
                localStorage.setItem("locations", JSON.stringify(newLocationsData))
                return newLocationsData
            },
            hydrateGeocodeData: (state: locationData[], action: PayloadAction<locationData[]>) => {
                return action.payload
            }
        }
    }
)

export const loadFromLocalStorage = () => {
    return (dispatch: Dispatch) => {
        const previousData: locationData[] = JSON.parse(localStorage.getItem("locations") ?? "[]")
        dispatch(hydrateGeocodeData(previousData))
    }
}
export const GeocodeCords = (lat: number, lng: number) => {
    return async (dispatch: Dispatch) => {
        const URL_Reverse = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=administrative_area_level_2&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        const fetchGeolocationData = async () => {
            const response = await fetch(URL_Reverse)
            if (!response.ok) return console.log("error fetching data")
            return await response.json()
        }
        try {
            const locationData :GeocodeReturn = await fetchGeolocationData()
            dispatch(setGeocodeData({
                address:locationData.results[0].formatted_address,
                location:locationData.results[0].geometry.location
            }))
        } catch (e) {
            console.log(e)
        }

    }
}

export const {setGeocodeData, hydrateGeocodeData} = GeocodeSlice.actions
export default GeocodeSlice