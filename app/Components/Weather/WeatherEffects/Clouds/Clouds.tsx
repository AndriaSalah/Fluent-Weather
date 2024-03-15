import './Clouds.scss'
import cloud1 from "@/public/cloud-1.svg";
import cloud3 from "@/public/cloud-2.svg";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "@/app/Stores";
import React from "react";

interface props{
    isCloudy:number
}
const Clouds : React.FC<props> = ({isCloudy}) => {
    const transition = useSelector((state: RootState) => state.flags.transition);
    return (
        isCloudy > 0 &&
        <div className={`clouds ${transition && "hidden"}`}>
            <div className={"cloud1"}>
                <Image src={cloud1} alt={"cloud"}/>
            </div>
            {isCloudy > 1 &&
                <>
                    <div className={"cloud2"}>
                        <Image src={cloud3} alt={"cloud"}/>
                    </div>
                </>
            }

        </div>
    )
}
export default Clouds

