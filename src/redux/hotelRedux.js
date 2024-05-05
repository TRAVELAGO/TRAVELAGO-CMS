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
    },
});

export const {
    chooseHotel,
    updateHotel,
} = hotelSlice.actions;
export default hotelSlice.reducer;
