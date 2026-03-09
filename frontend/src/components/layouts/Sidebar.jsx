import { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdOutlineNoteAlt } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

function DashboardSidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { user } = useAuth();
  const [isNotebooksOpen, setIsNotebooksOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? "text-white shadow-sm"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=1e646e&color=fff`;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#002c2f" }}>
            <MdOutlineNoteAlt className="text-white text-lg" />
          </div>
          <span className="text-lg font-bold text-gray-800">NotePlus</span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <img src={avatarUrl} alt={user?.name} className="w-9 h-9 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p>
            <p className="text-xs text-gray-400">{user?.email || ""}</p>
          </div>
        </div>

        {/* Add New Button */}
        <div className="px-4 py-4">
          <button
            className="w-full flex items-center justify-center gap-2 text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
            style={{ backgroundColor: "#002c2f" }}
          >
            <HiOutlinePencilAlt className="text-base" />
            Add New Note
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pb-4 overflow-y-auto space-y-1">
          {/* Your Notes */}
          <Link
            to="/dashboard"
            className={navLinkClass("/dashboard")}
            style={isActive("/dashboard") ? { backgroundColor: "#002c2f" } : {}}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Your Notes
          </Link>

          {/* Notebooks Dropdown */}
          <div>
            <button
              onClick={() => setIsNotebooksOpen(!isNotebooksOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Notebooks
              </div>
              {isNotebooksOpen ? <IoIosArrowUp className="text-xs" /> : <IoIosArrowDown className="text-xs" />}
            </button>

            {isNotebooksOpen && (
              <div className="ml-7 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                <Link to="/notebooks/project" className="block text-sm text-gray-500 py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors" style={{ color: isActive("/notebooks/project") ? "#1e646e" : "" }}>
                  Project Plans
                </Link>
                <Link to="/notebooks/routine" className="block text-sm text-gray-500 py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors" style={{ color: isActive("/notebooks/routine") ? "#1e646e" : "" }}>
                  Routine Notes
                </Link>
                <Link to="/notebooks/planning" className="block text-sm text-gray-500 py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors" style={{ color: isActive("/notebooks/planning") ? "#1e646e" : "" }}>
                  Planning
                </Link>
              </div>
            )}
          </div>

          {/* Reminder */}
          <Link
            to="/reminder"
            className={navLinkClass("/reminder")}
            style={isActive("/reminder") ? { backgroundColor: "#002c2f" } : {}}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Reminder
          </Link>

          {/* Tags */}
          <Link
            to="/tags"
            className={navLinkClass("/tags")}
            style={isActive("/tags") ? { backgroundColor: "#002c2f" } : {}}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Tags
          </Link>

          {/* Bin */}
          <Link
            to="/bin"
            className={navLinkClass("/bin")}
            style={isActive("/bin") ? { backgroundColor: "#002c2f" } : {}}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Bin
          </Link>
        </nav>

        {/* Upgrade Banner */}
        <div className="mx-3 mb-4 p-3 rounded-xl border" style={{ backgroundColor: "#f0f9f9", borderColor: "#c8e6e8" }}>
          <p className="text-xs font-medium" style={{ color: "#002c2f" }}>Set Business Account</p>
          <p className="text-xs mt-0.5 text-gray-400">Explore premium features</p>
          <button
            className="mt-2 w-full text-white text-xs font-medium py-1.5 rounded-lg transition-colors"
            style={{ backgroundColor: "#1e646e" }}
          >
            Upgrade
          </button>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;