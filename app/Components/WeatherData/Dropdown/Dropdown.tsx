import React, {useEffect, useRef, useState} from 'react';
import {FaAngleDown} from "react-icons/fa6";

import {options} from "@/app/Stores/utilsSlice";

interface props {
    defaultOption:options,
    options:options[],
    onChange : (option:options) => void
}
const Dropdown : React.FC<props> = ({ defaultOption , options=[] ,onChange}) => {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const [selectedOption , setSelectedOption] = useState<options>()
    const styles : React.CSSProperties = {
        visibility: isClicked ? "visible" : "hidden",
        opacity: isClicked ? 1 : 0
    }
    const SelectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e:Event){
            if(SelectRef.current && !SelectRef.current.contains(e.target as Node)){
                setIsClicked(false)
            }
        }
        document.addEventListener('click',handleClickOutside)
        return ()=>{
            document.removeEventListener('click',handleClickOutside)
        }
    }, []);
    const handleClick = () => setIsClicked(!isClicked)
    const setOption = (option:options) =>{
        setSelectedOption(option)
        onChange(option)
        setIsClicked(false)
    }
    return (
        <div className={"w-full grid place-items-end relative select-none"}>
        <div ref={SelectRef} className={"w-[7rem] flex-grow flex bg-white text-black p-2 rounded-lg bg-opacity-65 relative items-center justify-around hover:bg-opacity-50 cursor-pointer "} onClick={handleClick}>
            <p className={"text-md w-20 whitespace-nowrap overflow-hidden text-center overflow-ellipsis"}>{!selectedOption? defaultOption : selectedOption}</p>
            <FaAngleDown className={`${isClicked && "rotate-180"} duration-300`} />
        </div>
            <div className="Dropdown w-[7rem]  flex flex-col gap-1 absolute bg-white mt-1 top-full z-20 py-1 border-2 border-white border-opacity-25 rounded-lg duration-300"
                style={styles}>
                {options.map((option,index) => <p className={"rounded-lg text-base flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis py-1 px-2 hover:bg-blue-200 duration-300"} key={index} onClick={()=>setOption(option)}>{option}</p>)}
            </div>
        </div>
    );
};

export default Dropdown;