import React, {useEffect, useRef} from 'react';
import GreetingDialog, {DialogHandles} from "@/app/UI/GreetingDialog";
import Toast from "@/app/UI/Toast";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {toggleToast} from "@/app/Stores/utilsSlice";
import {GpsErrorDialog} from "@/app/UI/GpsErrorDialog";



const Overlays : React.FC = () => {
    const greetingDialog = useRef<DialogHandles>(null)
    const gpsErrorDialog = useRef<DialogHandles>(null)
    const {firstTime ,toast} = useAppSelector(state => state.utils);
    const {locationExists,locationsData} = useAppSelector(state => state.locations)
    const {gpsError} = useAppSelector(state => state.flags)
    const dispatch = useAppDispatch()
    useEffect(() => {
        locationExists && dispatch(toggleToast("Location already exists","error"))
    }, [dispatch,locationExists]);

    useEffect(() => {
        firstTime && greetingDialog.current?.openDialog()
        gpsError && locationsData.length === 0 && gpsErrorDialog.current?.openDialog()
    }, [firstTime,locationsData,gpsError]);
    return (
        <>
            {firstTime && <GreetingDialog message={"Hello!"} ref={greetingDialog}/>}
            {toast.showToast && <Toast/>}
            {gpsError && locationsData.length === 0 && <GpsErrorDialog message={"Oops!"} ref={gpsErrorDialog}/>}
        </>
    );
};

export default Overlays;