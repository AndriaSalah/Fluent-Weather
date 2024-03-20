import React from 'react';
import PropTypes from 'prop-types';

interface props {
    Title:String,
    Value:String|number,
    unit :String,
    span? :string
}
const DataCard : React.FC<props> = ({Title,Value,unit,span= ""}) => {
    return (
        <div className={`${span} shadow-card rounded-card bg-[#FFFFFF7F] backdrop-blur-3xl flex justify-around flex-col p-4`}>
            <p className={"text-md md:text-2xl"}>{Title}</p>
            <p className={"text-xl md:text-4xl text-center font-bold"}>{Value}<span className={`${unit !== '°' && "text-lg" } font-medium`}>{unit}</span></p>
            <p>details</p>
        </div>
    );
};

export default DataCard;