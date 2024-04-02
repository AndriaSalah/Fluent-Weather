import React, {useEffect, useRef} from 'react';
import GreetingDialog, {DialogHandles} from "@/app/Components/GreetingDialog/GreetingDialog";
import Toast from "@/app/UI/Toast";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {toggleToast} from "@/app/Stores/utilsSlice";



const Overlays : React.FC = () => {
    const greetingDialog = useRef<DialogHandles>(null)
    const gpsDialog = useRef<DialogHandles>(null)
    const {firstTime ,showToast} = useAppSelector(state => state.utils);
    const locationsExists = useAppSelector(state => state.locations.locationExists)
    const locationPermState = useAppSelector(state => state.flags.locationPermState)
    const dispatch = useAppDispatch()
    useEffect(() => {
        locationsExists && dispatch(toggleToast())
    }, [dispatch,locationsExists]);

    useEffect(() => {
        firstTime && greetingDialog.current?.openDialog()
    }, [firstTime]);
    return (
        <>
            {firstTime && <GreetingDialog message={"Hello!"} ref={greetingDialog}/>}
            {showToast && <Toast message={"Location already exists"} type={"error"}/>}
        </>
    );
};

export default Overlays;