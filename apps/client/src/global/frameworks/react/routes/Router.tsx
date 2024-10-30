import { createBrowserRouter, RouteObject } from "react-router-dom";
import { GlobalLayout } from "../layouts/GlobalLayout";
import { LandingPage } from "@landing-ui/pages";
import { RegisterPage } from "@user-management-ui/pages";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
