import { Outlet } from "react-router-dom";
import { NavBar } from "../components/organisms/NavBar";

export const GlobalLayout = (): JSX.Element => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <h1>Not Authenticated!</h1>;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
