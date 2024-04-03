import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {useFormatAddress} from "@/app/Utils/useFormatAddress";
import {getCurrentWeather} from "@/app/Stores/CurrentWeatherSlice";
import {getDailyWeather} from "@/app/Stores/DailyWeatherSlice";
import {AppDispatch} from "@/app/Stores/Store";
import {setIsRefreshing, setLoading} from "@/app/Stores/FlagsSlice";


export type locationData = {
    placeID: string
    address?: string | null,
    location: {
        lat: number | null,
        lng: number | null
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
                    lat: number | null,
                    lng
                        :
                        number | null
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
                state.locationsData = action.payload
            },
            removeLocation: (state: locationStore, action: PayloadAction<number>) => {
                const newLocationsList = state.locationsData.filter((location, index) => index !== action.payload)
                const newPointer: number = state.locationPointer > newLocationsList.length - 1 ? newLocationsList.length - 1 : state.locationPointer
                localStorage.setItem("locations", JSON.stringify(newLocationsList))
                return {
                    ...state,
                    locationsData: newLocationsList,
                    locationPointer: newPointer,
                }
            },
            initAutoGps: (state: locationStore) => {
                state.gpsLocationInit = true
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
    return async (dispatch: Dispatch) => {
        const previousData: locationData[] = await JSON.parse(localStorage.getItem("locations") ?? "[]")
        dispatch(hydrateGeocodeData(previousData))
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
            refresh ? dispatch(setIsRefreshing(false)) : dispatch(setLoading(false))
        }
    };
};
export const AutoGps = () => {
    return async (dispatch: AppDispatch) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log('Location permission granted');
                // User has granted permission
                const {latitude, longitude} = position.coords;
                const URL_Reverse = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=administrative_area_level_2&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
                const formatAddress = useFormatAddress
                const fetchGeolocationData = async () => {
                    const response = await fetch(URL_Reverse)
                    if (!response.ok) return console.log("error fetching data")
                    return await response.json()
                }
                try {
                    const locationData: GeocodeReturn = await fetchGeolocationData()
                    const formattedAddress = formatAddress(locationData.results[0].formatted_address)
                    dispatch(setGpsData({
                        placeID: locationData.results[0].place_id,
                        address: formattedAddress,
                        location: locationData.results[0].geometry.location
                    }))
                } catch (e) {
                    console.log(e)
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                // Handle location retrieval error
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
    initAutoGps,
    setGpsData
} = LocationsSlice.actions
export default LocationsSlice