import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isFetching: false,
        error: "",
    },
    reducers: {
        onStart: (state) => {
            state.isFetching = true;
            state.error = "";
        },
        onSuccess: (state) => {
            state.isFetching = false;
            state.error = "";
        },
        onFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
    }
});

export const { onStart, onSuccess, onFailure } = appSlice.actions;

export default appSlice.reducer;
