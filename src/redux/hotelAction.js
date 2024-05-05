import { chooseHotel } from "./hotelRedux";

export const selectHotel = async (dispatch, hotel) => {
    dispatch(chooseHotel({ hotel: hotel }));
};


