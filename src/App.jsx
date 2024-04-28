import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import BlankLayout from "./components/layout/blankLayout/BlankLayout";
import Layout from "./components/layout/userLayout/Layout";
import { singlePageLoader } from "./lib/loader";
import { resetFetch } from "./redux/appAction";
import { fetchInitRecentList, fetchInitWishlist } from "./redux/wishlistAction";
import BookingDetail from "./routes/bookingDetail/BookingDetail";
import ForgotPassword from "./routes/forgotPassword/ForgotPassword";
import HomePage from "./routes/homePage/homePage";
import HotelCreate from "./routes/hotelCreate/HotelCreate";
import HotelDetail from "./routes/hotelDetail/HotelDetail";
import HotelList from "./routes/hotelList/HotelList";
import HotelRegister from "./routes/hotelRegister/HotelRegister";
import Login from "./routes/login/Login";
import MyBooking from "./routes/myBooking/MyBooking";
import PaymentPage from "./routes/paymentPage/PaymentPage";
import Profile from "./routes/profile/Profile";
import Register from "./routes/register/Register";
import { makeRequest } from "./utils/axios";
import Wishlist from "./routes/wishlist/Wishlist";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <HomePage />,
      },
      {
        path: "/contact",
        element: <HomePage />,
      },
      {
        path: "/booking/:id",
        element: <BookingDetail />,
      },
      {
        path: "/hotel",
        children: [
          {
            path: "/hotel",
            element: <HotelList />,
          },
          {
            path: "/hotel/:id",
            element: <HotelDetail />,
            loader: singlePageLoader,
          },
          {
            path: "/hotel/new",
            element: <HotelCreate />,
          },
        ],
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/profile",
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/profile/update",
            element: <Profile />,
            // element: <ProfileUpdate />,
          },
          {
            path: "/profile/booking",
            element: <MyBooking />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/hotel/register",
        element: <HotelRegister />,
      },
      {
        path: "/return_url",
        element: <PaymentPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
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
  dispatch(resetFetch());
  dispatch(fetchInitWishlist());
  dispatch(fetchInitRecentList());

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
