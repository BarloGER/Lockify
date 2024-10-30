import { Outlet } from "react-router-dom";

export const GlobalLayout = (): JSX.Element => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <h1>Not Authenticated!</h1>;
  }

  return <Outlet />;
};
