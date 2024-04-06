import React, {useEffect, useRef} from 'react';
import GreetingDialog, {DialogHandles} from "@/app/UI/GreetingDialog";
import Toast from "@/app/UI/Toast";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {toggleToast} from "@/app/Stores/utilsSlice";



const Overlays : React.FC = () => {
    const greetingDialog = useRef<DialogHandles>(null)
    const {firstTime ,toast} = useAppSelector(state => state.utils);
    const {locationExists,locationsData} = useAppSelector(state => state.locations)
    const dispatch = useAppDispatch()
    useEffect(() => {
        locationExists && dispatch(toggleToast("Location already exists","error"))
    }, [dispatch,locationExists]);

    useEffect(() => {
        firstTime && greetingDialog.current?.openDialog()
    }, [firstTime,locationsData]);
    return (
        <>
            {firstTime && <GreetingDialog message={"Hello!"} ref={greetingDialog}/>}
            {toast.showToast && <Toast/>}
        </>
    );
};

export default Overlays;