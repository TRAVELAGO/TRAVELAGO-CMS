export const phoneRegex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;

export const passwordRegex =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

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
  ABOUT: "/about",
  CONTACT: "/contact",
  HOTEL: "/hotel",
  HOTEL_NEW: "/hotel/new",
  HOTEL_DETAIL: "/hotel/:id",
  BOOKING_DETAIL: "/booking/:id",
};

export const getQueryParams = (queryParams) => {
  const query = {};
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) {
      query[key] = value;
    }
  });

  return query;
};
