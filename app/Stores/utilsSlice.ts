import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


export type utils = {
    expand: boolean;
    selectedOption: string;
    locationPointer: number;
    leftButtonEnabled: boolean;
    rightButtonEnabled: boolean;
};
type buttons = {}
const initialState: utils = {
    expand: false,
    selectedOption: "temp",
    locationPointer: 0,
    leftButtonEnabled: true,
    rightButtonEnabled: true
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
        }
    },
});


export const {
    toggleExpansion,
    incLocationPointer,
    decLocationPointer,
    resetLocationPointer,
    updateLeftButton,
    updateRightButton
} = utilsSlice.actions;

export default utilsSlice;
