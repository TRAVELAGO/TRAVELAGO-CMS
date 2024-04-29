import { setRecentList, setWishlist } from "./wishlistRedux";

export const fetchInitWishlist = () => async (dispatch) => {
  const items = JSON.parse(localStorage.getItem("wishlist"));
  if (items) dispatch(setWishlist(items));
  else dispatch(setWishlist([]));
};

export const fetchWishlist = (wishlist) => async (dispatch) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  dispatch(setWishlist(wishlist));
};

export const isInWishlist = (wishlist, item) => {
  const existItem = wishlist.find((value) => value.id === item.id);
  return !!existItem;
};

export const fetchInitRecentList = () => async (dispatch) => {
  const items = JSON.parse(localStorage.getItem("recent"));
  if (items) dispatch(setRecentList(items));
  else dispatch(setRecentList([]));
};

export const fetchRecentList = (recent) => async (dispatch) => {
  localStorage.setItem("recent", JSON.stringify(recent));
  dispatch(setRecentList(recent));
};
