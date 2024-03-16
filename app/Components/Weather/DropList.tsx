import React from 'react';
import {locationData} from "@/app/Stores/GeocodeSlice";
import {FaTrash} from "react-icons/fa6";


interface listProps{
    listData:locationData[],
    isOpen:boolean,
    onSelect: (locationPointer:number)=>void
    onButtonClick : (locationPointer:number)=>void
}
const DropList: React.FC<listProps> = ({listData,isOpen,onSelect,onButtonClick}) => {
    return (
       isOpen &&
       <ul className={"w-full bg-white flex-col flex items-center bg-opacity-50 backdrop-blur-lg animate-fadeIn mt-1  absolute top-full rounded text-black  z-40"}>
            {listData.map((listItem , index) =>
                <>
            <div onClick={()=>onSelect(index)} key={index} className={`flex w-full p-4 justify-between  hover:bg-white hover: bg-opacity-75 rounded cursor-pointer`}>
                <p className={""}>{listItem.address}</p>
                <button onClick={()=>onButtonClick(index)} type={"button"}><FaTrash/></button>
            </div>
                    <span className={"h-[1px] w-full bg-black"}/>
                </>
            )}
        </ul>
    );
};

export default DropList;