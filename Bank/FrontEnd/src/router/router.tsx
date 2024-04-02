import { createBrowserRouter } from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Overview,
  EditUserDetails,
  ChangeUserPassword,
  Account,
  Current,
  Transfer,
  Loan,
  Breakdown,
  Error,
  LoansBrowser,
} from "../pages";

import { loader as userLoader } from "../pages/DashboardLayout";
import { loader as accountLoader } from "../pages/Account";
import { loader as loanLoader } from "../pages/LoansBrowser";

import { action as registerAction } from "../pages/Register";
import { action as loginAction } from "../pages/Login";
import { action as editUserDetailsAction } from "../pages/EditUserDetails";
import { action as changeUserPasswordAction } from "../pages/ChangeUserPassword";

import { action as openAccountAction } from "../pages/Overview";
import { action as transferAction } from "../pages/Transfer";
import { action as calculateLoanAction } from "../pages/Loan";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
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
        id: "dashboardRoot",
        loader: userLoader,
        children: [
          {
            index: true,
            element: <Overview />,
            action: openAccountAction,
          },
          {
            path: "edit-details",
            element: <EditUserDetails />,
            action: editUserDetailsAction,
          },
          {
            path: "change-password",
            element: <ChangeUserPassword />,
            action: changeUserPasswordAction,
          },
          {
            path: "accounts/:number",
            element: <Account />,
            loader: accountLoader,
            children: [
              { index: true, element: <Current /> },
              {
                path: "transfer",
                element: <Transfer />,
                action: transferAction,
              },
              {
                path: "loan",
                children: [
                  {
                    path: "request",
                    element: <Loan />,
                    action: calculateLoanAction,
                  },
                  {
                    path: "browse",
                    element: <LoansBrowser />,
                    loader: loanLoader,
                  },
                ],
              },
              { path: "breakdown", element: <Breakdown /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
