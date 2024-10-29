import React, { ReactNode } from "react";
import { NavBar } from "../organisms/NavBar";

interface MainTemplateProps {
  children: ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full h-12 z-50">
        <NavBar />
      </header>
      <main className="flex flex-col pt-12 min-h-svh">{children}</main>
    </>
  );
};
