import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

export type options = "Temp" | "Wind" | "Rain" | "UV"

export type utils ={
    expand: boolean,
    selectedOption : options
    locationPointer: number,
    leftButtonEnabled: boolean,
    rightButtonEnabled: boolean,
    name:string,
    firstTime:boolean
};

const initialState: utils = {
    expand: false,
    selectedOption: "Temp",
    locationPointer: 0,
    leftButtonEnabled: true,
    rightButtonEnabled: true,
    name:"",
    firstTime:false
};
const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        toggleExpansion: (state: utils) => {
            state.expand = !state.expand;
            console.log(state.expand)
        },
        changeSelectedOption: (state: utils, actions: PayloadAction<options>) => {
            state.selectedOption = actions.payload
        },
        incLocationPointer: (state: utils) => {
            state.locationPointer++
        },
        decLocationPointer: (state: utils) => {
            state.locationPointer--
        },
        resetLocationPointer: (state: utils) => {
            state.locationPointer = 0
        },
        updateLeftButton: (state: utils, actions: PayloadAction<boolean>) => {
            state.leftButtonEnabled = actions.payload
        },
        updateRightButton : (state: utils, actions: PayloadAction<boolean>) => {
            state.rightButtonEnabled = actions.payload
        },
        setName : (state: utils , actions : PayloadAction<string>) => {
            localStorage.setItem("name",actions.payload)
            state.name = actions.payload
        },
        setFirstTime : (state :utils , action :PayloadAction<boolean>) => {
            state.firstTime = action.payload
            localStorage.setItem("firstTime",JSON.stringify(action.payload))
        }
    },
});

export const hydrateUserFromLocal = () =>{
    return async (dispatch:Dispatch) => {
        let Username: string = localStorage.getItem("name") ?? ""
        let firstTime: boolean = JSON.parse(localStorage.getItem("firstTime") ?? "true")
        dispatch(setName(Username))
        dispatch(setFirstTime(firstTime))
    }
}


export const {
    toggleExpansion,
    changeSelectedOption,
    incLocationPointer,
    decLocationPointer,
    resetLocationPointer,
    updateLeftButton,
    updateRightButton,
    setName,
    setFirstTime
} = utilsSlice.actions;

export default utilsSlice;
