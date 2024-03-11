import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


export type utils = {
    expand: boolean,
    selectedOption: string,
    locationPointer: number,
    leftButtonEnabled: boolean,
    rightButtonEnabled: boolean,
    name:string,
    firstTime:boolean
};
type buttons = {}
const initialState: utils = {
    expand: false,
    selectedOption: "temp",
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
        changeSelectedOption: (state: utils, actions: PayloadAction<utils>) => {
            state.selectedOption = actions.payload.selectedOption
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
    incLocationPointer,
    decLocationPointer,
    resetLocationPointer,
    updateLeftButton,
    updateRightButton,
    setName,
    setFirstTime
} = utilsSlice.actions;

export default utilsSlice;
