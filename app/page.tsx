'use client'
import  {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/Stores/Store";
import {hydrateFlags} from "@/app/Stores/FlagsSlice";
import {permanentRedirect, useRouter} from "next/navigation";
import Loader from "@/app/UI/Loader";


export default function Home () {
    const {firstTime} = useAppSelector(state => state.flags)
    const dispatch = useAppDispatch()

    useEffect(() => {
       dispatch(hydrateFlags())
    },[dispatch]);
    useEffect(() => {
        if(firstTime !== null ) firstTime ? permanentRedirect("/greeting") : permanentRedirect("/main")
    },[firstTime]);
    return (
        <Loader/>
    )
}


