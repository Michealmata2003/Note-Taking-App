import DashboardHeader from "../components/layouts/Header"
import DashboardSidebar from "../components/layouts/Sidebar"
import Binmain from "../components/dashboard/Binmain"
import Footer from "../components/layouts/Footer"
import { SidebarProvider } from "../context/SidebarContext"

function Bin() {
  return (
    <SidebarProvider>
      <DashboardHeader/>
      <DashboardSidebar/>
      <Binmain/>
      <Footer />
    </SidebarProvider>
  )
}

export default Bin
