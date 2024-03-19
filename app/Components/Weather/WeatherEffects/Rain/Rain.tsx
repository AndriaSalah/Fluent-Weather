import './Rain.scss'
import React from "react";
import {useAppSelector} from "@/app/Stores/Store";

interface props {
    isRaining:number
}
export const Rain : React.FC<props> = ({isRaining}) => {
    const transition = useAppSelector(state => state.flags.transition);
    return (
        isRaining > 0 &&
        <div className={`RainWrapper ${transition && "hidden"}`}>

                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>
                <i className="rain"></i><i className="rain"></i>


            {
                isRaining > 1 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }
            {isRaining > 2 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }
            {
                isRaining > 3 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>

                </>
            }
            {
                isRaining > 4 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }

            {
                isRaining > 5 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }
            {
                isRaining > 6 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }
            {
                isRaining > 7 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }
            {
                isRaining > 8 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }
        </div>
    )
}