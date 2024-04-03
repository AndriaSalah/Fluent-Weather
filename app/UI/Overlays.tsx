import React, {useEffect, useRef} from 'react';
import GreetingDialog, {DialogHandles} from "@/app/Components/GreetingDialog/GreetingDialog";
import Toast from "@/app/UI/Toast";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {toggleToast} from "@/app/Stores/utilsSlice";



const Overlays : React.FC = () => {
    const greetingDialog = useRef<DialogHandles>(null)
    const {firstTime ,showToast} = useAppSelector(state => state.utils);
    const locationsExists = useAppSelector(state => state.locations.locationExists)
    const dispatch = useAppDispatch()
    useEffect(() => {
        locationsExists && dispatch(toggleToast("Location already exists","error"))
    }, [dispatch,locationsExists]);

    useEffect(() => {
        firstTime && greetingDialog.current?.openDialog()
    }, [firstTime]);
    return (
        <>
            {firstTime && <GreetingDialog message={"Hello!"} ref={greetingDialog}/>}
            {showToast && <Toast/>}
        </>
    );
};

export default Overlays;