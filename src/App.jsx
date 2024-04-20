import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BlankLayout from "./components/layout/blankLayout/BlankLayout";
import Layout from "./components/layout/userLayout/Layout";
import { singlePageLoader } from "./lib/loader";
import BookingDetail from "./routes/bookingDetail/BookingDetail";
import ForgotPassword from "./routes/forgotPassword/ForgotPassword";
import HomePage from "./routes/homePage/homePage";
import HotelList from "./routes/hotelList/HotelList";
import Login from "./routes/login/Login";
import MyBooking from "./routes/myBooking/MyBooking";
import HotelCreate from "./routes/hotelCreate/HotelCreate";
import PaymentPage from "./routes/paymentPage/PaymentPage";
import Profile from "./routes/profile/Profile";
import Register from "./routes/register/Register";
import HotelDetail from "./routes/hotelDetail/HotelDetail";

function App() {
  const router = createBrowserRouter([
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
          path: "/return_url",
          element: <PaymentPage />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
