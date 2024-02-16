import React from 'react';
import PropTypes from 'prop-types';

interface props {
    Title:String,
    Value:String|number,
    unit :String
}
const DataCard : React.FC<props> = ({Title,Value,unit}) => {
    return (
        <div className={"shadow-card rounded-card bg-[#FFFFFF7F] backdrop-blur-3xl flex justify-around flex-col p-4"}>
            <p className={"text-2xl"}>{Title}</p>
            <p className={"text-4xl text-center font-bold"}>{Value}<span className={`${unit !== '°' && "text-lg" } font-medium`}>{unit}</span></p>
            <p>details</p>
        </div>
    );
};

export default DataCard;