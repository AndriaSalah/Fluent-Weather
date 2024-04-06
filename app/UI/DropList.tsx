import React, {forwardRef, useEffect} from 'react';
import {locationData} from "@/app/Stores/LocationsSlice";
import {FaLocationDot, FaTrash} from "react-icons/fa6";
import {useAppSelector} from "@/app/Stores/Store";


interface listProps{
    listData:locationData[],
    isOpen:boolean,
    onSelect: (locationPointer:number)=>void
    onButtonClick : (locationPointer:number)=>void
    onUnFocus : (e:MouseEvent)=>void
}
const DropList = forwardRef<HTMLUListElement,listProps>(({listData,isOpen,onSelect,onButtonClick,onUnFocus},ref) => {
    const {useGPS} = useAppSelector(state => state.flags)
    const locationPointer = useAppSelector(state => state.locations.locationPointer)
    useEffect(() => {
        document.addEventListener("click",onUnFocus)
        return ()=> document.removeEventListener("click",onUnFocus)
    }, [onUnFocus]);
    return (
       isOpen &&
       <ul ref={ref} className={"w-full max-h-[25vh] overflow-auto bg-white flex-col flex items-center bg-opacity-50 backdrop-blur-lg animate-fadeIn mt-1  absolute top-[125%] rounded-md text-black  z-40"}>
            {listData.map((listItem , index) =>
            <div key={index} className={`${locationPointer === index && "bg-white"} flex w-full select-none justify-between  hover:bg-white hover: bg-opacity-75 rounded-md cursor-pointer`}>
                <button onClick={()=>onSelect(index)} type={"button"} className={"flex-1 text-start p-4"}>{
                    useGPS && index === 0 ? "Current Location" : listItem.address
                }</button>
                {useGPS && index === 0 ?
                    <button type={"button"}
                            className={"m-2 p-2 rounded-lg hover:bg-blue-400 duration-300 "}><FaLocationDot/></button>
                    : <button onClick={() => onButtonClick(index)} type={"button"}
                         className={"m-2 p-2 rounded-lg hover:bg-blue-400 duration-300 "}><FaTrash/></button>
                }
            </div>
            )}
        </ul>
    );
});
DropList.displayName="LocationsList"

export default DropList;