import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        currentHotel: null,
    },
    reducers: {
        chooseHotel: (state, action) => {
            state.currentHotel = action.payload.hotel;
        },

        updateHotel: (state, action) => {
            state.currentHotel = action.payload.hotel;
        },
        logoutHotel: (state) => {
            state.currentHotel = null;
        },
    },
});

export const {
    chooseHotel,
    updateHotel,
    logoutHotel
} = hotelSlice.actions;
export default hotelSlice.reducer;
