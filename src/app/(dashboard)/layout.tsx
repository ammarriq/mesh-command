import React, { PropsWithChildren } from "react";
import NavBar from "@/components/layout/nav-bar";
import DashboardSidebar from "@/components/layout/dashboard-sidebar";

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-full flex flex-col justify-stretch min-h-screen">
      <NavBar />
      <section className="flex-1 flex justify-stretch items-stretch">
        <DashboardSidebar />
        <section className="bg-Bg-Dark p-4 flex-1 flex">{children}</section>
      </section>
    </main>
  );
}

export default DashboardLayout;
