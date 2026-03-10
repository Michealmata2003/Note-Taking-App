import { useState, useRef, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdOutlineNoteAlt } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const dummyNotifications = [
  { id: 1, name: "Emma Watson", time: "12:47 pm", message: "Shared a note with you", avatar: "https://ui-avatars.com/api/?name=Emma+Watson&background=f43f5e&color=fff" },
  { id: 2, name: "Ashlynn Franci", time: "11:30 pm", message: "Commented on your note", avatar: "https://ui-avatars.com/api/?name=Ashlynn+Franci&background=8b5cf6&color=fff" },
  { id: 3, name: "Kianna Carder", time: "11:21 pm", message: "Liked your reminder note", avatar: "https://ui-avatars.com/api/?name=Kianna+Carder&background=0ea5e9&color=fff" },
];

function DashboardHeader() {
  const { toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const msgRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (msgRef.current && !msgRef.current.contains(e.target)) setShowMessages(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=1e646e&color=fff`;

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white border-b border-gray-100 shadow-sm z-30 flex items-center justify-between px-4 lg:px-6">

      {/* Left — hamburger + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors lg:hidden"
        >
          <HiMenuAlt2 className="text-xl" />
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#002c2f" }}>
            <MdOutlineNoteAlt className="text-white text-sm" />
          </div>
          <span className="font-bold text-gray-800 text-sm">NotePlus</span>
        </div>
      </div>

      {/* Right — icons */}
      <div className="flex items-center gap-1 ml-auto">

        {/* Messages */}
        <div className="relative" ref={msgRef}>
          <button
            onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); setShowProfile(false); }}
            className="relative p-2.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <MdOutlineMailOutline className="text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showMessages && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Messages</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {dummyNotifications.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{item.time}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                <button className="text-xs font-medium" style={{ color: "#1e646e" }}>View All</button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); setShowProfile(false); }}
            className="relative p-2.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <IoMdNotificationsOutline className="text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {dummyNotifications.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{item.time}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                <button className="text-xs font-medium" style={{ color: "#1e646e" }}>View All</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-1" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); setShowMessages(false); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <img src={avatarUrl} alt={user?.name} className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name || "User"}</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user?.email || ""}</p>
              </div>
              <div className="py-1">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </Link>
                <Link to="/profile/edit" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </Link>
                <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Settings
                </Link>
              </div>
              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;