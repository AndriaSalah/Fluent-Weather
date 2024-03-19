"use client"
import React, {ReactNode} from 'react';
import {Provider} from "react-redux";
import {store} from "@/app/Stores/Store";

type props = {
    children : ReactNode
}
const Providers = ({children} :props) => {
    return (
        <Provider store={store}>{children}</Provider>
    );
};


export default Providers;