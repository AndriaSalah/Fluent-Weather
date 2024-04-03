

const useCheckLocationPerm = async ():Promise<boolean> => {
        try {
            const result = await navigator.permissions.query({ name: 'geolocation' });
            if (result.state === 'granted') return true
            else if (result.state === 'prompt'|| 'denied') return false

        } catch (error:any) {
            console.error('Error checking location permission:', error);
        }
        return false
    };


export default useCheckLocationPerm;
