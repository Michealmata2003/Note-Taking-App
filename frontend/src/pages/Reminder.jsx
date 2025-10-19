import DashboardHeader from "../components/layouts/Header"
import DashboardSidebar from "../components/layouts/Sidebar"
import Remindermain from "../components/dashboard/Remindermain"
import Footer from "../components/layouts/Footer"
import { SidebarProvider } from "../context/SidebarContext"

function Reminder() {
  return (
    <SidebarProvider>
      <DashboardHeader/>
      <DashboardSidebar/>
      <Remindermain/>
      <Footer />
    </SidebarProvider>
  )
}

export default Reminder
