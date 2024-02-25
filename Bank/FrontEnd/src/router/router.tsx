import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout";
import Register from "../pages/Register";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import DashboardLayout from "../pages/DashboardLayout";
import Accounts from "../pages/Accounts";
import Overview from "../pages/Overview";

import { action as registerAction } from "../pages/Register";
import { action as loginAction } from "../pages/Login";
import { loader as OverviewLoader } from "../pages/Overview";

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
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Overview />,
            loader: OverviewLoader,
          },
          {
            path: "accounts",
            element: <Accounts />,
          },
        ],
      },
    ],
  },
]);

export default router;
