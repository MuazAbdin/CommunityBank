import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout";
import Register from "../pages/Register";
import Landing from "../pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      // {
      //   path: "login",
      //   element: <Login />,
      // },
      // {
      //   path: "dashboard",
      //   element: <DashboardLayout />,
      //   children: [],
      // },
    ],
  },
]);

export default router;
