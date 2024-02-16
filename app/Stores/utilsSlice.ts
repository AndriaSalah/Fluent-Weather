import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {state} from "sucrase/dist/types/parser/traverser/base";

type utils = {
  expand: boolean;
  selectedOption : string;
};
const initialState: utils = {
  expand: false,
  selectedOption:"temp"
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
    }
  },
});

export const { toggleExpansion } = utilsSlice.actions;

export default utilsSlice;
