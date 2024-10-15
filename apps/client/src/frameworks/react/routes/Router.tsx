import { createBrowserRouter, RouteObject } from "react-router-dom";
import { GlobalLayout } from "../layouts/GlobalLayout";
import { LandingPage } from "../components/pages/LandingPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
