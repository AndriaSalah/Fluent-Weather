import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "@/app/Stores/Store";
import {disableLocationExists} from "@/app/Stores/LocationsSlice";

export type options = "Temp" | "Wind" | "Rain" | "UV"
type toastTypes = "success" | "error" | "normal"
type toast = {
    showToast: boolean,
    toastType: toastTypes ,
    toastMessage: any
}
export type utils = {
    expand: boolean,
    locationListIsOpen: boolean
    selectedOption: options
    leftButtonEnabled: boolean,
    rightButtonEnabled: boolean,
    name: string,
    toast: toast
};

const initialState: utils = {
    expand: false,
    locationListIsOpen: false,
    selectedOption: "Temp",
    leftButtonEnabled: true,
    rightButtonEnabled: true,
    name: "",
    toast: {
        showToast: false,
        toastType: "normal",
        toastMessage: ""
    }
};
const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        toggleExpansion: (state: utils) => {
            state.expand = !state.expand;
        },
        changeSelectedOption: (state: utils, actions: PayloadAction<options>) => {
            state.selectedOption = actions.payload
        },
        updateLeftButton: (state: utils, actions: PayloadAction<boolean>) => {
            state.leftButtonEnabled = actions.payload
        },
        updateRightButton: (state: utils, actions: PayloadAction<boolean>) => {
            state.rightButtonEnabled = actions.payload
        },
        setName: (state: utils, actions: PayloadAction<string>) => {
            localStorage.setItem("name", actions.payload)
            state.name = actions.payload
        },
        setLocationListIsOpened: (state: utils, action: PayloadAction<boolean>) => {
            state.locationListIsOpen = action.payload
        },
        setToast: (state: utils, actions: PayloadAction<{ showToast: boolean, toastType?: toastTypes, toastMessage?: any }>) => {
            state.toast = {
                showToast: actions.payload.showToast,
                toastMessage: actions.payload.toastMessage,
                toastType: actions.payload.toastType ?? "normal"
            }
        },
    },
});

export const getSavedUserName = () => {
    return async (dispatch: Dispatch) => {
        let Username: string = localStorage.getItem("name") ?? ""
        dispatch(setName(Username))
    }
}

export const toggleToast = (message: string, type: toastTypes) => {
    return (dispatch: AppDispatch) => {
        dispatch(setToast({
            showToast: true,
            toastMessage: message,
            toastType: type
        }))
        setTimeout(() => {
            dispatch(disableLocationExists())
            dispatch(setToast({
                showToast: false
            }))
        }, 5000)
    }
}
export const {
    toggleExpansion,
    changeSelectedOption,
    updateLeftButton,
    updateRightButton,
    setName,
    setLocationListIsOpened,
    setToast,
} = utilsSlice.actions;

export default utilsSlice;
