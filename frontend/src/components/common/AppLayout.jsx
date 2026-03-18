import { SidebarProvider } from "../../context/SidebarContext";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";

function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Sidebar />
        <div className="lg:ml-64 pt-16 min-h-screen flex flex-col">
          {children}
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;