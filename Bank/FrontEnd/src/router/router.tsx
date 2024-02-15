import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    // children: [
    //   {
    //     index: true,
    //     element: <Landing />,
    //   },
    //   {
    //     path: "dashboard",
    //     element: <DashboardLayout />,
    //     children: [],
    //   },
    // ],
  },
]);

export default router;
