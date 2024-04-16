import React, {useRef} from 'react';
import {FaAngleDown} from "react-icons/fa6";
import DropList from "@/app/UI/DropList";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {removeLocation, setLocationPointer} from "@/app/Stores/LocationsSlice";
import {setLocationListIsOpened} from "@/app/Stores/utilsSlice";


const AddressList = () => {
    const {locationListIsOpen} = useAppSelector(state => state.utils)
    const {locationPointer, locationsData} = useAppSelector(state => state.locations)
    const listRef = useRef<HTMLUListElement>(null)
    const dispatch = useAppDispatch()

    const changeLocation = (locationPointer: number) => {
        dispatch(setLocationPointer(locationPointer))
        dispatch(setLocationListIsOpened(false))
    }
    const deleteLocation = (locationPointer: number) => {
        dispatch(removeLocation(locationPointer))
    }
    const toggleList = () => locationsData.length > 1 && dispatch(setLocationListIsOpened(!locationListIsOpen))
    const locationListUnFocus = (e: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(e.target as Node)) dispatch(setLocationListIsOpened(false))
    }

    return (
        <div onClick={toggleList}
             className={`flex ${locationsData.length>1 ? "cursor-pointer" : "cursor-default"} items-center max-md:justify-center justify-start gap-2.5 relative max-md:w-full w-1/4`}>
                <h1 className={"max-md:text-center w-fit text-3xl md:text-4xl font-light"}>{locationsData[locationPointer]?.address ?? "..."}</h1>
                {locationsData.length > 1 &&
                    <>
                        <FaAngleDown
                            className={`text-2xl ${locationListIsOpen ? "rotate-180" : "rotate-0"} duration-300`}/>
                        <DropList ref={listRef} listData={locationsData} isOpen={locationListIsOpen}
                                  onSelect={changeLocation}
                                  onButtonClick={deleteLocation} onUnFocus={locationListUnFocus}/>
                    </>
                }
        </div>
    );
};

export default AddressList;