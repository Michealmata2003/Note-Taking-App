import DashboardHeader from "../layouts/Header";
import DashboardSidebar from "../layouts/Sidebar";
import Main from "./Main";
import Footer from "../layouts/Footer";
import { SidebarProvider } from "../../context/SidebarContext";

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <DashboardSidebar />
        {/* Main content pushed right of sidebar on desktop */}
        <div className="lg:ml-64 pt-16 min-h-screen flex flex-col">
          <Main />
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
































// // src/pages/DashboardPage.jsx
// import Main from "./Main";
// import DashboardHeader from "../layouts/Header";
// import DashboardSidebar from "../layouts/Sidebar";
// import Footer from "../layouts/Footer";
// import { SidebarProvider } from "../../context/SidebarContext";

// const DashboardPage = () => {
//   return (
//     <SidebarProvider>
//         <DashboardHeader />
//         <DashboardSidebar />
//         <Main />
//         <Footer />
//     </SidebarProvider>
//   );
// };

// export default DashboardPage;
