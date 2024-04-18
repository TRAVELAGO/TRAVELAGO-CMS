import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: "",
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = "";
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = "";
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.isFetching = true;
            state.error = "";
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = "";
        },
        registerFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        updateSuccess: (state, action) => {
            state.isFetching = true;
            state.currentUser = action.payload
            state.error = "";
        },
        logoutSuccess: (state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = "";
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    updateSuccess,
    logoutSuccess,
} = userSlice.actions;
export default userSlice.reducer;