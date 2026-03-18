import { useState, useRef, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineNoteAlt } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FiFileText, FiCheckSquare, FiBookOpen, FiSun } from "react-icons/fi";
import { BsPerson, BsPencil, BsGear, BsShield, BsBoxArrowRight } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";

const dummyTags = [
  { letter: "A", name: "Afternoon" },
  { letter: "B", name: "Book" },
  { letter: "C", name: "Cupcake" },
  { letter: "D", name: "Dinner" },
  { letter: "E", name: "Evening Snacks" },
  { letter: "F", name: "Fast Track" },
  { letter: "G", name: "Good Morning" },
  { letter: "H", name: "Health" },
  { letter: "I", name: "Ice Cream" },
  { letter: "J", name: "Juice" },
  { letter: "K", name: "Kangaroo" },
  { letter: "L", name: "Leaves" },
  { letter: "M", name: "Machine" },
  { letter: "N", name: "Nail Polish" },
];

const notebookLinks = [
  { to: "/notebooks/project-plans", label: "Project Plans" },
  { to: "/notebooks/routine-notes", label: "Routine Notes" },
  { to: "/notebooks/planning", label: "Planning" },
];

const noteTypes = [
  { label: "Blank Notes", icon: <FiFileText />, type: "blank" },
  { label: "To-do", icon: <FiCheckSquare />, type: "todo" },
  { label: "Essay Notes", icon: <FiBookOpen />, type: "essay" },
  { label: "Daily Reflection", icon: <FiSun />, type: "daily" },
];

function DashboardSidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isNotebooksOpen, setIsNotebooksOpen] = useState(false);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTagsPanelOpen, setIsTagsPanelOpen] = useState(false);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [showRenameTag, setShowRenameTag] = useState(false);
  const [tags, setTags] = useState(dummyTags);
  const [newTagName, setNewTagName] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addNewRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addNewRef.current && !addNewRef.current.contains(e.target)) setIsAddNewOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-open notebooks dropdown if on a notebook page
  useEffect(() => {
    if (location.pathname.startsWith("/notebooks/")) {
      setIsNotebooksOpen(true);
    }
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const isNotebookActive = location.pathname.startsWith("/notebooks/");

  const navLinkClass = (path) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path) ? "text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=1e646e&color=fff`;

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleCreateTag = (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    setTags([...tags, { letter: newTagName[0].toUpperCase(), name: newTagName }]);
    setNewTagName("");
    setShowCreateTag(false);
  };

  const handleRenameTag = (e) => {
    e.preventDefault();
    setTags(tags.map((t) => (t === selectedTag ? { ...t, name: renameValue } : t)));
    setShowRenameTag(false);
    setSelectedTag(null);
  };

  const handleDeleteTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden" onClick={toggleSidebar} />
      )}

      {/* ── Tags Side Panel ── */}
      {isTagsPanelOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-[60]" onClick={() => setIsTagsPanelOpen(false)} />
          <div
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[70] flex flex-col"
            style={{ animation: "slideInRight 0.25s ease forwards" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100" style={{ backgroundColor: "#002c2f" }}>
              <h3 className="text-white font-semibold text-sm">Tag List</h3>
              <button onClick={() => setIsTagsPanelOpen(false)} className="text-white opacity-70 hover:opacity-100 text-xl leading-none">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
              {tags.map((tag, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 group">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: "#1e646e" }}>
                      {tag.letter}
                    </span>
                    <span className="text-sm text-gray-700 font-medium">{tag.name}</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setSelectedTag(tag); setRenameValue(tag.name); setShowRenameTag(true); }} className="text-xs text-blue-500 hover:underline">Rename</button>
                    <button onClick={() => handleDeleteTag(tag)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-4 py-4">
              {!showCreateTag ? (
                <button onClick={() => setShowCreateTag(true)} className="w-full py-2.5 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: "#002c2f" }}>
                  + Create New Tag
                </button>
              ) : (
                <form onSubmit={handleCreateTag} className="space-y-2">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Tag name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-400"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setShowCreateTag(false)} className="flex-1 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="flex-1 py-2 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: "#1e646e" }}>Create</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── Rename Tag Modal ── */}
      {showRenameTag && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-[80] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-base font-bold text-gray-800 mb-4">Rename Your Tag</h3>
            <form onSubmit={handleRenameTag} className="space-y-3">
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400"
                autoFocus
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowRenameTag(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium" style={{ backgroundColor: "#002c2f" }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#002c2f" }}>
              <MdOutlineNoteAlt className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold text-gray-800">NotePlus</span>
          </Link>
        </div>

        {/* User Profile Dropdown */}
        <div className="border-b border-gray-100" ref={profileRef}>
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
            <img src={avatarUrl} alt={user?.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
            <p className="text-sm font-semibold text-gray-800 truncate flex-1 text-left">{user?.name || "User"}</p>
            {isProfileOpen ? <IoIosArrowUp className="text-gray-400 text-xs flex-shrink-0" /> : <IoIosArrowDown className="text-gray-400 text-xs flex-shrink-0" />}
          </button>

          {isProfileOpen && (
            <div className="border-t border-gray-100 py-1 bg-gray-50">
              <Link to="/profile" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"><BsPerson /> My Profile</Link>
              <Link to="/profile/edit" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"><BsPencil /> Edit Profile</Link>
              <Link to="/settings" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"><BsGear /> Account Settings</Link>
              <Link to="/privacy" className="flex items-center gap-3 px-5 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"><BsShield /> Privacy Settings</Link>
              <div className="border-t border-gray-200 mt-1 pt-1">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <BsBoxArrowRight /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add New Dropdown */}
        <div className="px-4 py-3 border-b border-gray-100" ref={addNewRef}>
          <button
            onClick={() => setIsAddNewOpen(!isAddNewOpen)}
            className="w-full flex items-center justify-between text-white text-sm font-medium py-2.5 px-4 rounded-lg shadow-sm"
            style={{ backgroundColor: "#002c2f" }}
          >
            <span className="flex items-center gap-2"><HiOutlinePencilAlt className="text-base" /> Add New</span>
            {isAddNewOpen ? <IoIosArrowUp className="text-xs" /> : <IoIosArrowDown className="text-xs" />}
          </button>

          {isAddNewOpen && (
            <div className="mt-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
              {noteTypes.map((type) => (
                <Link
                  key={type.type}
                  to={`/notes/new?type=${type.type}`}
                  onClick={() => setIsAddNewOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <span style={{ color: "#1e646e" }}>{type.icon}</span>
                  {type.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-teal-400 focus-within:bg-white transition-all">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="text-xs outline-none bg-transparent w-full text-gray-600 placeholder-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-300 hover:text-gray-500 transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">

          {/* Your Notes */}
          <Link to="/dashboard" className={navLinkClass("/dashboard")} style={isActive("/dashboard") ? { backgroundColor: "#002c2f" } : {}}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Your Notes
          </Link>

          {/* Notebooks */}
          <div>
            <button
              onClick={() => setIsNotebooksOpen(!isNotebooksOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isNotebookActive ? "text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              style={isNotebookActive ? { backgroundColor: "#002c2f" } : {}}
            >
              <span className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Notebooks
              </span>
              {isNotebooksOpen ? <IoIosArrowUp className="text-xs" /> : <IoIosArrowDown className="text-xs" />}
            </button>

            {isNotebooksOpen && (
              <div className="ml-4 mt-1 space-y-0.5 border-l-2 pl-3" style={{ borderColor: "#e5e7eb" }}>
                {notebookLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block text-sm py-2 px-2 rounded-md transition-colors font-medium"
                    style={{
                      color: isActive(item.to) ? "#1e646e" : "#6b7280",
                      backgroundColor: isActive(item.to) ? "#f0f9f9" : "",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Reminder */}
          <Link to="/reminder" className={navLinkClass("/reminder")} style={isActive("/reminder") ? { backgroundColor: "#002c2f" } : {}}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Reminder
          </Link>

          {/* Tags */}
          <button
            onClick={() => setIsTagsPanelOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Tags
          </button>

          {/* Bin */}
          <Link to="/bin" className={navLinkClass("/bin")} style={isActive("/bin") ? { backgroundColor: "#002c2f" } : {}}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Bin
          </Link>
        </nav>

        {/* Upgrade Banner */}
        <div className="mx-3 mb-4 p-4 rounded-xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, #002c2f 0%, #1e646e 100%)" }}>
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 bg-white" />
          <div className="absolute -bottom-4 -left-2 w-14 h-14 rounded-full opacity-10 bg-white" />
          <p className="text-white text-xs font-bold relative z-10">Set Business Account</p>
          <p className="text-white text-xs opacity-70 mt-0.5 relative z-10">Explore Premium Features</p>
          <button className="mt-3 w-full text-xs font-semibold py-2 rounded-lg relative z-10" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
            Upgrade
          </button>
        </div>
      </aside>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default DashboardSidebar;