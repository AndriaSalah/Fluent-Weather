import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {FormatAddress} from "@/app/Utils/FormatAddress";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import {AppDispatch, RootState} from "@/app/Stores/Store";
import {
    savedLocationsLoaded,
    setGpsError,
    setInitialLocationState,
    setIsRefreshing,
    setLoading,
    setUseGps
} from "@/app/Stores/FlagsSlice";
import {toggleToast} from "@/app/Stores/utilsSlice";



export type locationData = {
    placeID: string
    address?: string ,
    location: {
        lat: number,
        lng: number
    }
}
export type locationStore = {
    locationPointer: number
    locationsData: locationData[],
    locationExists: boolean,
    gpsLocationInit: boolean
}
type GeocodeReturn = {
    results: [
        {
            place_id: string
            formatted_address: string,
            geometry: {
                location: {
                    lat: number,
                    lng: number
                }
            }
        }
    ]
}

const initialState: locationStore = {
    locationPointer: 0,
    locationsData: [],
    locationExists: false,
    gpsLocationInit: false
}
const LocationsSlice = createSlice({
        name: "Geocode",
        initialState,
        reducers: {
            setGeocodeData: (state: locationStore, action: PayloadAction<locationData>) => {
                const existingLocation = state.locationsData.find((location: locationData) => location.placeID === action.payload.placeID);
                if (!existingLocation) {
                    const localStorageReady = [action.payload, ...state.locationsData.filter(
                        (item, index) => state.gpsLocationInit ? index !== 0 : item)];
                    localStorage.setItem("locations", JSON.stringify(localStorageReady));
                    state.locationsData = state.gpsLocationInit ? [state.locationsData[0], ...localStorageReady] : localStorageReady
                    state.locationPointer = state.gpsLocationInit ? 1 : 0
                } else {
                    state.locationExists = true
                    return;
                }
            },
            hydrateGeocodeData: (state: locationStore, action: PayloadAction<locationData[]>) => {
                state.locationsData = state.gpsLocationInit ? [state.locationsData[0],... action.payload] : action.payload
            },
            removeLocation: (state: locationStore, action: PayloadAction<number>) => {
                const filteredLocationsList = state.locationsData.filter(
                    (_, index) =>state.gpsLocationInit && index === 0 ? false : index !== action.payload)
                // const newPointer: number = state.gpsLocationInit && newLocationsList.length === 0 ? 0 : state.locationPointer > newLocationsList.length - 1 ? newLocationsList.length - 1 : state.locationPointer;
                localStorage.setItem("locations", JSON.stringify(filteredLocationsList))
                const newLocationsList = state.gpsLocationInit ? [state.locationsData[0],...filteredLocationsList] : filteredLocationsList
                const newPointer: number = Math.max(0,Math.min(state.locationPointer, newLocationsList.length - 1));
                return {
                    ...state,
                    locationsData: newLocationsList,
                    locationPointer: newPointer,
                }
            },
            setGpsData: (state: locationStore, action: PayloadAction<locationData>) => {
                if (state.gpsLocationInit) state.locationsData[0] = action.payload
                else {
                    state.locationsData.unshift(action.payload)
                    state.gpsLocationInit = true
                }
            },
            incLocationPointer: (state: locationStore) => {
                state.locationPointer++
            },
            decLocationPointer: (state: locationStore) => {
                state.locationPointer--
            },
            setLocationPointer: (state: locationStore, action: PayloadAction<number>) => {
                state.locationPointer = action.payload
            },
            resetLocationPointer: (state: locationStore) => {
                state.locationPointer = state.gpsLocationInit ? 1 : 0
            },
            disableLocationExists: (state: locationStore) => {
                state.locationExists = false
            }
        }
    }
)

export const loadFromLocalStorage = () => {
    return (dispatch: Dispatch) => {
        const previousData: locationData[] = JSON.parse(localStorage.getItem("locations") ?? "[]")
        dispatch(hydrateGeocodeData(previousData))
        dispatch(savedLocationsLoaded())
    }
}
export const getWeather = (lat: number, lng: number, refresh?: boolean) => {
    return async (dispatch: AppDispatch) => {
        try {
            await Promise.all([
                dispatch(getCurrentWeather(lat, lng)),
                dispatch(getDailyWeather(lat, lng))
            ]);
            dispatch(setLoading(false));
            dispatch(setIsRefreshing(false))
        } catch (error) {
            console.error("Error fetching weather data:", error);
            dispatch(toggleToast("error 132: " + error,"error"))
            refresh ? dispatch(setIsRefreshing(false)) : dispatch(setLoading(false))
        }
    };
};
export const AutoGps = () => {
    return async (dispatch: AppDispatch , getState: () => RootState) => {
        const SavedLocationsLoaded = getState().flags.isSavedLocationsLoaded
        const firstTime = getState().utils.firstTime
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {latitude, longitude} = position.coords;
                const URL_Reverse = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=administrative_area_level_2&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`

                const fetchGeolocationData = async () => {
                    const response = await fetch(URL_Reverse)
                    if (!response.ok) dispatch(toggleToast("error 101: error fetching data ","error"))
                    return await response.json()
                }
                try {
                    const locationData: GeocodeReturn = await fetchGeolocationData()
                    const formattedAddress = FormatAddress(locationData.results[0].formatted_address)
                    dispatch(setGpsData({
                        placeID: locationData.results[0].place_id,
                        address: formattedAddress,
                        location: locationData.results[0].geometry.location
                    }))
                    dispatch(setUseGps(true))
                    firstTime && (setInitialLocationState(true))
                    !SavedLocationsLoaded && dispatch(loadFromLocalStorage())
                } catch (e) {
                    dispatch(toggleToast("error 102: " + e,"error"))
                }
            },
            (error) => {
                dispatch(toggleToast(error.message,"error"))
                dispatch(setGpsError(true))
                dispatch(setUseGps(false))
                !savedLocationsLoaded && dispatch(loadFromLocalStorage())
            })


    }
}


export const {
    setGeocodeData,
    hydrateGeocodeData,
    removeLocation,
    setLocationPointer,
    resetLocationPointer,
    decLocationPointer,
    incLocationPointer,
    disableLocationExists,
    setGpsData
} = LocationsSlice.actions
export default LocationsSlice