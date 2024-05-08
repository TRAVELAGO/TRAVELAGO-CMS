export const TRAVELAGO = "Travelago";

export const ROLE = {
  USER: "USER",
  HOTEL: "HOTEL",
};

export const PATH_URL = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  HOTEL_REGISTER: "/hotel/register",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE: "/profile",
  PROFILE_UPDATE: "/profile/update",
  PROFILE_BOOKING: "/profile/booking",
  CHOOSE_HOTEL: "/chooseHotel",
  WISHLIST: "/wishlist",
  ABOUT: "/about",
  CONTACT: "/contact",
  HOTEL: "/hotel",
  HOTEL_NEW: "/hotel/new",
  HOTEL_DETAIL: "/hotel/:id",
  BOOKING_DETAIL: "/booking/:id",
  NOT_FOUND: "/not-found",
};

export const MAX_RECENT_LIST = 50;

export const getQueryParams = (queryParams) => {
  const query = {};
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) {
      query[key] = value;
    }
  });

  return query;
};
