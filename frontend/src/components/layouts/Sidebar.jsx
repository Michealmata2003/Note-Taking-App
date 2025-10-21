import { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function DashboardSidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button onClick={toggleSidebar} className="absolute top-4 right-4 text-xl">
        ✕
      </button>

      {/* Sidebar Navigation */}
      <nav className="mt-16 flex flex-col space-y-2 p-4">
        <Link to="/dashboard" className="hover:bg-gray-100 px-3 py-2 rounded-md transition">
          Notes
        </Link>

        {/* Dropdown Section */}
        <div>
          <button onClick={toggleDropdown} className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <span>Notebooks</span>
            {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>

          {/* Dropdown Links */}
          {isDropdownOpen && (
            <div className="ml-4 mt-2 flex flex-col space-y-2">
              <Link to="/notebooks/project" className="hover:bg-gray-100 px-3 py-1 rounded-md text-sm">
                Project Plans
              </Link>
              <Link to="/notebooks/routine" className="hover:bg-gray-100 px-3 py-1 rounded-md text-sm">
                Routine Notes
              </Link>
              <Link to="/notebooks/planning" className="hover:bg-gray-100 px-3 py-1 rounded-md text-sm">
                Planning
              </Link>
            </div>
          )}
        </div>

        <Link to="/reminder" className="hover:bg-gray-100 px-3 py-2 rounded-md transition">
          Reminder
        </Link>

        <Link to="/tags" className="hover:bg-gray-100 px-3 py-2 rounded-md transition">
          Tags
        </Link>

        <Link to="/bin" className="hover:bg-gray-100 px-3 py-2 rounded-md transition">
          Bin
        </Link>

        <Link to="/others"className="hover:bg-gray-100 px-3 py-2 rounded-md transition">
          Other Page
        </Link>
      </nav>
    </div>
  );
}

export default DashboardSidebar;
