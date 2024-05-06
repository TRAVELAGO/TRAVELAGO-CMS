import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    currentUser: null,
    hotel: null,
    isFetching: false,
    error: "",
  },
  reducers: {
    onStart: (state) => {
      state.isFetching = true;
      state.error = "";
    },
    onFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    onReset: (state) => {
      state.isFetching = false;
      state.error = "";
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      state.hotel = action.payload.hotel;
      state.error = "";
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.user;
      state.error = "";
    },
    sendEmailSuccess: (state) => {
      state.isFetching = false;
      state.error = "";
    },
    resetPasswordSuccess: (state) => {
      state.isFetching = false;
      state.error = "";
    },
    updateSuccess: (state, action) => {
      state.isFetching = true;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      state.error = "";
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.token = null;
      state.currentUser = null;
      state.error = "";
    },
  },
});

export const {
  onStart,
  onFailure,
  onReset,
  loginSuccess,
  registerSuccess,
  sendEmailSuccess,
  resetPasswordSuccess,
  updateSuccess,
  logoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
