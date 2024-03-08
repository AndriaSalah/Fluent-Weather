import React from "react";

interface props {
    text: string,
    underlineColor?: string,
    header?: boolean
}

const UnderlinedText: React.FC<props> = ({text, underlineColor = "bg-blue-400" , header=false}) => {
    return (
        <div className={`w-fit ${header && "p-6"}`}>
            <h1 className={`${header ? "text-4xl" : "text-xl font-light"}`}>{text}</h1>
            <span className={`w-full rounded h-1 block ${underlineColor}`}/>
        </div>
    );
};

export default UnderlinedText;