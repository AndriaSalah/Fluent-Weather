
const useCheckLocationPerm = () => {
    return  async ()  => {
        try {
            const result = await navigator.permissions.query({ name: 'geolocation' });
            if (result.state === 'granted') {
                return true
            } else if (result.state === 'prompt' || result.state === 'denied') {
                console.log(result.state)
                return false
            }
        } catch (error) {
            console.error('Error checking location permission:', error);
            return false
        }
    };
};

export default useCheckLocationPerm;
