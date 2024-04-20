import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { profilePageLoader, singlePageLoader } from "./lib/loader";
import BookingDetail from "./routes/bookingDetail/BookingDetail";
import ForgotPassword from "./routes/forgotPassword/ForgotPassword";
import HomePage from "./routes/homePage/homePage";
import Layout from "./components/layout/userLayout/Layout";
import BlankLayout from "./components/layout/blankLayout/BlankLayout";
import ListPage from "./routes/listPage/listPage";
import Login from "./routes/login/Login";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import PaymentPage from "./routes/paymentPage/PaymentPage";
import ProfilePage from "./routes/profilePage/profilePage";
import Register from "./routes/register/Register";
import SinglePage from "./routes/singlePage/singlePage";

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
          path: "/list",
          element: <ListPage />,
          // loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/bookingDetail/:id",
          element: <BookingDetail />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/newPost",
          element: <NewPostPage />,
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
