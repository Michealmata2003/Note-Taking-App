// src/pages/DashboardPage.jsx
import React from "react";
import Main from "./Main";
import DashboardHeader from "../layouts/Header";
import DashboardSidebar from "../layouts/Sidebar";
import { SidebarProvider } from "../../context/SidebarContext";

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <DashboardHeader />
      <DashboardSidebar />
      <Main />
    </SidebarProvider>
  );
};

export default DashboardPage;
