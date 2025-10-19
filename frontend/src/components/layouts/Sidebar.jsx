import { useSidebar } from "../../context/SidebarContext";
import { Link } from "react-router-dom";

function DashboardSidebar() {
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
        {/* <Link to='/dashboard'>Your Notes</Link> */}
        <a href="/dashboard">Notes</a>
        <Link to='/notebooks'>Notebooks</Link>
        <Link to='/reminder'>Reminder</Link>
        <Link to='/notebooks'>Tags</Link>
        <Link to='/bin'>Bin</Link>
        <Link to='/others'>Other Page</Link>
      </nav>
    </div>
  );
}

export default DashboardSidebar;
