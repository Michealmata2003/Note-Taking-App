import { useState, useRef, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdOutlineNoteAlt, MdOutlineMailOutline } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";

const dummyMessages = [
  { id: 1, name: "Emma Watson", time: "12 : 47 pm", message: "Lorem ipsum dolor sit amet", avatar: "https://ui-avatars.com/api/?name=Emma+Watson&background=f43f5e&color=fff" },
  { id: 2, name: "Ashlynn Franci", time: "11 : 30 pm", message: "Lorem ipsum dolor sit amet", avatar: "https://ui-avatars.com/api/?name=Ashlynn+Franci&background=8b5cf6&color=fff" },
  { id: 3, name: "Kianna Carder", time: "11 : 21 pm", message: "Lorem ipsum dolor sit amet", avatar: "https://ui-avatars.com/api/?name=Kianna+Carder&background=0ea5e9&color=fff" },
];

function DropdownPanel({ title, items }) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
            <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
              <p className="text-xs font-medium text-gray-400">{item.time}</p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-gray-100 text-center">
        <button className="text-xs font-semibold hover:underline" style={{ color: "#1e646e" }}>
          View All
        </button>
      </div>
    </div>
  );
}

function DashboardHeader() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const msgRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (msgRef.current && !msgRef.current.contains(e.target)) setShowMessages(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white border-b border-gray-100 shadow-sm z-30 flex items-center justify-between px-4 lg:px-6 gap-4">

      {/* Left — hamburger + mobile logo */}
      <div className="flex items-center gap-3 flex-shrink-0">
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

      {/* Center — Write Your Note bar */}
      <div
        onClick={() => navigate("/notes/new?type=blank")}
        className="flex-1 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 cursor-pointer hover:border-teal-300 hover:bg-white transition-all duration-200 group max-w-xl"
      >
        <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-teal-300 transition-colors">
          <HiOutlinePencilAlt className="text-gray-400 group-hover:text-teal-600 text-sm transition-colors" />
        </div>
        <span className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors select-none">
          Write Your Note...
        </span>
      </div>

      {/* Right — messages + notifications */}
      <div className="flex items-center gap-2 flex-shrink-0">

        {/* Messages */}
        <div className="relative" ref={msgRef}>
          <button
            onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); }}
            className="relative p-2.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <MdOutlineMailOutline className="text-xl" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 text-white text-xs font-bold rounded-full flex items-center justify-center" style={{ backgroundColor: "#1e646e" }}>
              2
            </span>
          </button>
          {showMessages && <DropdownPanel title="Messages" items={dummyMessages} />}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); }}
            className="relative p-2.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <IoMdNotificationsOutline className="text-xl" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 text-white text-xs font-bold rounded-full flex items-center justify-center" style={{ backgroundColor: "#1e646e" }}>
              2
            </span>
          </button>
          {showNotifications && <DropdownPanel title="Notifications" items={dummyMessages} />}
        </div>

      </div>
    </header>
  );
}

export default DashboardHeader;