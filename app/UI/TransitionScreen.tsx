import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {disableInitialLoad, toggleTransition} from "@/app/Stores/FlagsSlice";
import Loader from "@/app/UI/Loader";

const TransitionScreen = () => {
    const [transitionTimer, setTransitionTimer] = useState<any>(null);
    const isDay = useAppSelector(state => state.currentWeather.current.is_day)
    const transition = useAppSelector(state => state.flags.transition)
    const {loading, initialLoad} = useAppSelector(state => state.flags);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const animate = (delay: number) => {
            setTransitionTimer(setTimeout(() => {
                dispatch(toggleTransition(false));
                setTransitionTimer(null);
            }, delay));
        }
        if (initialLoad) {
            dispatch(disableInitialLoad())
        } else if (!transitionTimer) {
            dispatch(toggleTransition(true));
            !loading && animate(700)
        }

        return () => {
            clearTimeout(transitionTimer);
            setTransitionTimer(null);
        };
    }, [dispatch, loading]);

    return (
        <span
            className={`block w-full h-screen absolute bg-black ${transition ? "opacity-100" : isDay ? "bg-opacity-10" : "bg-opacity-55"} duration-700`}>
                    {transition && <Loader/>}
                </span>
    );
};

export default TransitionScreen;