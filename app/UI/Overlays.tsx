import React, {useEffect, useRef} from 'react';
import GreetingDialog, {DialogHandles} from "@/app/Components/GreetingDialog/GreetingDialog";
import Toast from "@/app/UI/Toast";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {toggleToast} from "@/app/Stores/utilsSlice";

interface OverLays {
    openGpsDialog :() => void
}
const Overlays : React.FC<OverLays> = ({openGpsDialog}) => {
    const greetingDialog = useRef<DialogHandles>(null)
    const {firstTime ,showToast} = useAppSelector(state => state.utils);
    const locationsExists = useAppSelector(state => state.locations.locationExists)
    const dispatch = useAppDispatch()
    useEffect(() => {
        locationsExists && dispatch(toggleToast())
    }, [dispatch,locationsExists]);

    useEffect(() => {
        firstTime && greetingDialog.current?.openDialog()
    }, [firstTime]);
    return (
        <>
            {firstTime && <GreetingDialog openGpsDialog={openGpsDialog} message={"Hello!"} onSubmit={()=>{}} ref={greetingDialog}/>}
            {showToast && <Toast message={"Location already exists"} type={"error"}/>}
        </>
    );
};

export default Overlays;