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
        setIsClicked(false)
    }
    useEffect(() => {
        selectedOption ?
        onChange(selectedOption) : onChange(defaultOption)
    }, [defaultOption, onChange, selectedOption]);
    return (
        <div ref={SelectRef} className={"max-w-[45%] relative select-none"}>
        <div className={"w-full flex-grow flex bg-white text-black p-2 rounded-2xl relative items-center gap-2"} onClick={handleClick}>
            <p className={"text-xs w-20 whitespace-nowrap overflow-hidden overflow-ellipsis"}>{!selectedOption? defaultOption : selectedOption}</p>
            <FaAngleDown />
        </div>
            <div className="Dropdown w-full flex flex-col gap-1 absolute bg-white top-10 z-20 p-2 border-2 border-white border-opacity-25 rounded-lg"
                style={styles}>
                {options.map((option,index) => <p className={"rounded-lg text-base flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis py-1 px-2 hover:bg-gray-300"} key={index} onClick={()=>setOption(option)}>{option}</p>)}
            </div>
        </div>
    );
};

export default Dropdown;