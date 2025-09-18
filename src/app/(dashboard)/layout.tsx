import NavBar from "@/components/layout/nav-bar";
import React, { PropsWithChildren } from "react";

function DashboradLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default DashboradLayout;
