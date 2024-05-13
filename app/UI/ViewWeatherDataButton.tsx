import React from 'react';
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {toggleExpansion} from "@/app/Stores/utilsSlice";

interface props {
    isMobile?:boolean
}
const ViewWeatherDataButton : React.FC<props> = ({isMobile}) => {
    const expand = useAppSelector(state => state.utils.expand);
    const dispatch = useAppDispatch()
    const clickHandler = () => dispatch(toggleExpansion());
    const buttonStyles= {
        mobile:`h-10 w-10 text-white backdrop-blur-3xl rounded-[50%] text-5xl flex items-center z-30
         fixed bottom-6 right-[50vw] translate-x-1/2 md:hidden 
         ${expand ? "-rotate-90 bg-black bg-opacity-50 " : "rotate-90 bg-white bg-opacity-50 "}  duration-200`,

        desktop:`h-10 w-10 text-white bg-white bg-opacity-50 backdrop-blur-3xl rounded-[50%] text-5xl flex items-center
         fixed max-md:hidden md:-left-[3.5rem] hover:scale-110
         ${expand && "md:rotate-180" } duration-300`
    }
    return (
            <button
                onClick={clickHandler}
                className={isMobile? buttonStyles.mobile : buttonStyles.desktop}>
                <MdOutlineKeyboardArrowLeft/>
            </button>


    );
};

export default ViewWeatherDataButton;