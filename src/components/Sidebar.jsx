import { useSidebar } from "../ContextAPI/SidebarContext";
import { Link } from "react-router-dom";

function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button onClick={toggleSidebar} className="absolute top-4 right-4 text-xl">
        ✕
      </button>

      <nav className="mt-16 flex flex-col space-y-4 p-4">
        {/* <Link to='/home'>Home</Link> */}
        <a href="/notes" onClick={toggleSidebar}>Notes</a>
        <a href="/settings" onClick={toggleSidebar}>Settings</a>
      </nav>
    </div>
  );
}

export default Sidebar;
