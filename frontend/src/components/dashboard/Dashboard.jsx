// src/pages/DashboardPage.jsx
import Main from "./Main";
import DashboardHeader from "../layouts/Header";
import DashboardSidebar from "../layouts/Sidebar";
import Footer from "../layouts/Footer";
import { SidebarProvider } from "../../context/SidebarContext";

const DashboardPage = () => {
  return (
    <SidebarProvider>
        <DashboardHeader />
        <DashboardSidebar />
        <Main />
        <Footer />
    </SidebarProvider>
  );
};

export default DashboardPage;
