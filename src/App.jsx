import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import BlankLayout from "./components/layout/blankLayout/BlankLayout";
import Layout from "./components/layout/userLayout/Layout";
import { singlePageLoader } from "./lib/loader";
import { resetFetch } from "./redux/appAction";
import { fetchInitRecentList, fetchInitWishlist } from "./redux/wishlistAction";
import PageNotFound from "./routes/404/PageNotFound";
import BookingDetail from "./routes/bookingDetail/BookingDetail";
import ChooseHotel from "./routes/chooseHotel/ChooseHotel";
import ForgotPassword from "./routes/forgotPassword/ForgotPassword";
import HomePage from "./routes/homePage/homePage";
import HotelList from "./routes/hotelList/HotelList";
import HotelRegister from "./routes/hotelRegister/HotelRegister";
import Login from "./routes/login/Login";
import MyBooking from "./routes/myBooking/MyBooking";
import PaymentPage from "./routes/paymentPage/PaymentPage";
import PrivacyPolicy from "./routes/privacyPolicy/PrivacyPolicy";
import Profile from "./routes/profile/Profile";
import Register from "./routes/register/Register";
import RoomCreate from "./routes/roomCreate/RoomCreate";
import RoomDetail from "./routes/roomDetail/RoomDetail";
import RoomList from "./routes/roomList/RoomList";
import TermsAndConditions from "./routes/termsAndConditions/TermsAndConditons";
import Wishlist from "./routes/wishlist/Wishlist";
import { makeRequest } from "./utils/axios";
import { PATH_URL } from "./utils/const/common";

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: PATH_URL.HOME,
        element: <HomePage />,
      },
      {
        path: PATH_URL.ABOUT,
        element: <HomePage />,
      },
      {
        path: PATH_URL.CONTACT,
        element: <HomePage />,
      },
      {
        path: PATH_URL.TERMS_AND_CONDITIONS,
        element: <TermsAndConditions />,
      },
      {
        path: PATH_URL.PRIVACY_POLICY,
        element: <PrivacyPolicy />,
      },
      {
        path: PATH_URL.BOOKING_DETAIL,
        element: <BookingDetail />,
      },
      {
        path: PATH_URL.HOTEL,
        children: [
          {
            path: PATH_URL.HOTEL,
            element: <HotelList />,
          },
        ],
      },
      {
        path: PATH_URL.ROOM,
        children: [
          {
            path: PATH_URL.ROOM,
            element: <RoomList />,
          },
          {
            path: PATH_URL.ROOM_DETAIL,
            element: <RoomDetail />,
            loader: singlePageLoader,
          },
          {
            path: PATH_URL.ROOM_NEW,
            element: <RoomCreate />,
          },
        ],
      },
      {
        path: PATH_URL.WISHLIST,
        element: <Wishlist />,
      },
      {
        path: PATH_URL.PROFILE,
        children: [
          {
            path: PATH_URL.PROFILE,
            element: <Profile />,
          },
          {
            path: PATH_URL.PROFILE_UPDATE,
            element: <Profile />,
            // element: <ProfileUpdate />,
          },
          {
            path: PATH_URL.PROFILE_BOOKING,
            element: <MyBooking />,
          },
        ],
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      {
        path: PATH_URL.LOGIN,
        element: <Login />,
      },
      {
        path: PATH_URL.REGISTER,
        element: <Register />,
      },
      {
        path: PATH_URL.HOTEL_REGISTER,
        element: <HotelRegister />,
      },
      {
        path: "/return_url",
        element: <PaymentPage />,
      },
      {
        path: PATH_URL.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: PATH_URL.CHOOSE_HOTEL,
        element: <ChooseHotel />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

function App() {
  const { token } = useSelector((state) => state.user);
  const accessToken = token?.accessToken;
  if (accessToken) {
    makeRequest.defaults.headers.common = {
      Authorization: `bearer ${accessToken}`,
    };
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFetch());
    dispatch(fetchInitWishlist());
    dispatch(fetchInitRecentList());
  }, []);

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
