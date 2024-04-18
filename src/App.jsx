import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loader";
import ForgotPassword from "./routes/forgotPassword/ForgotPassword";
import HomePage from "./routes/homePage/homePage";
import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPage";
import Login from "./routes/login/Login";
import NewPostPage from "./routes/newPostPage/NewPostPage";
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
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
