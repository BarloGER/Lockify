import { createBrowserRouter, RouteObject } from "react-router-dom";
import { GlobalLayout } from "../layouts/GlobalLayout";
import { LandingPage } from "../../../features/landing/frameworks/react/components/pages/LandingPage";
import { RegisterPage } from "../../../features/user-managment/frameworks/react/ui/pages/RegisterPage";

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
