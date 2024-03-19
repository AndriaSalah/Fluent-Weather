import './Clouds.scss'
import cloud1 from "@/public/cloud-1.svg";
import cloud3 from "@/public/cloud-2.svg";
import Image from "next/image";
import {useAppSelector} from "@/app/Stores/Store";
import React from "react";

interface props{
    isCloudy:number
}
const Clouds : React.FC<props> = ({isCloudy}) => {
    const transition = useAppSelector(state => state.flags.transition);
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

