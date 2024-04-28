import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: [],
        recentList: [],
    },
    reducers: {
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
        setRecentList: (state, action) => {
            state.recentList = action.payload;
        },
    }
});

export const { setWishlist, setRecentList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
