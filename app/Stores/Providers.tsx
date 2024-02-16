"use client"
import React, {ReactNode} from 'react';
import PropTypes from 'prop-types';
import {Provider} from "react-redux";
import {store} from "@/app/Stores/index";

type props = {
    children : ReactNode
}
const Providers = ({children} :props) => {
    return (
        <Provider store={store}>{children}</Provider>
    );
};


export default Providers;