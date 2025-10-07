import { FaAlignJustify } from "react-icons/fa"
import { LuNotebookText } from "react-icons/lu"
import { MdOutlineMailOutline } from "react-icons/md"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FaRegUser } from "react-icons/fa"
import { useSidebar } from "../ContextAPI/SidebarContext"

function Header() {
    const {toggleSidebar} = useSidebar()

  return (
        <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md px-6 py-3 flex items-center justify-between">
            <div className="flex justify-between items-center w-full px-3 py-3">
              <div className="text-2xl flex justify-between space-x-3">
                <button onClick={toggleSidebar}>
                    <FaAlignJustify />
                </button>
                <LuNotebookText />
              </div>
              <div className="text-2xl flex justify-between space-x-3">
                <MdOutlineMailOutline />
                <IoMdNotificationsOutline />
                <FaRegUser />
              </div>
            </div>
        </header>
  )
}

export default Header
