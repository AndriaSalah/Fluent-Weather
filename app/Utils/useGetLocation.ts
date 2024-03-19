import { useEffect } from 'react';
import {AppDispatch} from "@/app/Stores/Store";
import {GeocodeCords} from "@/app/Stores/LocationsSlice";

const useLocationPermission = (dispatch: AppDispatch) => {
    return  async () => {
        try {
            const result = await navigator.permissions.query({ name: 'geolocation' });
            if (result.state === 'prompt' || result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('Location permission granted');
                        const { latitude, longitude } = position.coords;
                        dispatch(GeocodeCords(latitude, longitude));
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else if (result.state === 'denied') {
                console.log('Location permission denied');
            }
        } catch (error) {
            console.error('Error checking location permission:', error);
        }
    };


};

export default useLocationPermission;
