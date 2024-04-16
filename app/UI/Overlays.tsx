import React, {useEffect, useRef} from 'react';
import  {DialogHandles} from "@/app/UI/GpsDialog";
import Toast from "@/app/UI/Toast";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {toggleToast} from "@/app/Stores/utilsSlice";
import {GpsErrorDialog} from "@/app/UI/GpsErrorDialog";

const Overlays : React.FC = () => {
    const gpsErrorDialog = useRef<DialogHandles>(null)
    const {toast} = useAppSelector(state => state.utils);
    const {locationExists,locationsData} = useAppSelector(state => state.locations)
    const {gpsError , firstTime} = useAppSelector(state => state.flags)
    const dispatch = useAppDispatch()
    useEffect(() => {
        locationExists && dispatch(toggleToast("Location already exists","error"))
    }, [dispatch,locationExists]);

    useEffect(() => {
        gpsError && locationsData.length === 0 && gpsErrorDialog.current?.openDialog()
    }, [firstTime,locationsData,gpsError]);
    return (
        <>
            {toast.showToast && <Toast/>}
            {gpsError && locationsData.length === 0 && <GpsErrorDialog message={"Oops!"} ref={gpsErrorDialog}/>}
        </>
    );
};

export default Overlays;