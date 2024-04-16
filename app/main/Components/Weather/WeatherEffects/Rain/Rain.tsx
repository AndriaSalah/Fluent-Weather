import './Rain.scss'
import React from "react";
import {useAppSelector} from "@/app/Stores/Store";

interface props {
    isRaining: number,
}

export const Rain: React.FC<props> = ({isRaining}) => {
    const rainDrops = new Array(Math.min(isRaining, 8) * 22).fill(null)
    const transition = useAppSelector(state => state.flags.transition);
    return (
        isRaining > 0 &&
        <div className={`RainWrapper ${transition && "hidden"}`}>
            {rainDrops.map((_, index) => <i key={index} className="rain"></i>)}
        </div>
    )
}

