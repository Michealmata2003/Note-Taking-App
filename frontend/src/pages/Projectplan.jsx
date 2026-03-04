import DashboardHeader from "../components/layouts/Header"
import DashboardSidebar from "../components/layouts/Sidebar"
import Projectsmain from "../components/dashboard/Projectsmain"
import Footer from "../components/layouts/Footer"
import { SidebarProvider } from "../context/SidebarContext"

function Projectplan() {
  return (
    <SidebarProvider>
      <DashboardHeader/>
      <DashboardSidebar/>
      <Projectsmain/>
      <Footer />

      {/* <section className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-md">
        <h1 className="text-xl font-bold mb-4 text-gray-800">My Notes</h1>
        <div className="space-y-3">
            {DummyProjects.map((note, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div
                     className="flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition" onClick={() => toggleDropdown(index)}>
                        <div>
                            <p className="font-semibold text-gray-800">{note.title}</p>
                            <p className="text-sm text-gray-500">
                                {note.author} - {note.date} - {note.tag}
                            </p>
                        </div>
                        {openIndex === index ? (
                            <IoIosArrowUp className="text-gray-500"/>
                        ) : (
                            <IoIosArrowDown className="text-gray-500"/>
                        )}
                    </div>
                    {openIndex === index && (
                        <div className="mt-2 border-t border-gray-100 pt-2 space-y-1">
                            {note.subNotes.map((sub, subIndex) => (
                                <div
                                 key={subIndex}
                                 className="text-sm text-gray-600 hover:text-gray-800 pl-2"
                                >
                                    {sub.title} — {sub.author} — {sub.data} — {sub.tag}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
        </section> */}
    </SidebarProvider>
  )
}

export default Projectplan
