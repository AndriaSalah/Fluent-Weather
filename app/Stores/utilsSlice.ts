import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {state} from "sucrase/dist/types/parser/traverser/base";

export type utils = {
  expand: boolean;
  selectedOption : string;
  locationPointer : number;
};
const initialState: utils = {
  expand: false,
  selectedOption:"temp",
  locationPointer:0
};
const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    toggleExpansion: (state: utils) => {
      state.expand = !state.expand;
      console.log(state.expand)
    },
    changeSelectedOption:(state:utils , actions : PayloadAction<utils>) =>{
      state.selectedOption = actions.payload.selectedOption
    },
    incLocationPointer : (state:utils)=> {
      state.locationPointer ++
    },
    decLocationPointer : (state:utils)=> {
      state.locationPointer --
    },
    resetLocationPointer : (state:utils) => {
      state.locationPointer = 0
    }
  },
});



export const { toggleExpansion ,incLocationPointer ,decLocationPointer, resetLocationPointer } = utilsSlice.actions;

export default utilsSlice;
