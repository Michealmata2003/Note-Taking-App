import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaFolder, FaFolderOpen } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiOutlineShare } from "react-icons/hi";
import { FiArrowLeft } from "react-icons/fi";

// Notebook config — later this comes from the API
const notebookConfig = {
  "project-plans": {
    title: "Project Plans",
    description: "Manage and track your project related notes",
    icon: "🗂️",
  },
  "routine-notes": {
    title: "Routine Notes",
    description: "Track your daily and weekly routines",
    icon: "🔄",
  },
  planning: {
    title: "Planning",
    description: "Plan ahead with structured notes",
    icon: "📋",
  },
};

const dummyNotes = [
  {
    title: "First Notebook",
    author: "Bud Wiser",
    date: "Dec 4",
    tag: "Only You",
    subNotes: [],
  },
  {
    title: "Birthday Celebration",
    author: "Bud Wiser",
    date: "Dec 4",
    tag: "Only You",
    subNotes: [
      { title: "Cake Order", author: "Bud Wiser", date: "Dec 4", tag: "Only You" },
      { title: "Guest List", author: "Bud Wiser", date: "Dec 4", tag: "02 share" },
    ],
  },
  {
    title: "Lecture Notes",
    author: "Bud Wiser",
    date: "Dec 5",
    tag: "02 share",
    subNotes: [
      { title: "Chapter 1", author: "Bud Wiser", date: "Dec 5", tag: "Only You" },
    ],
  },
  {
    title: "Meal Planner",
    author: "Bud Wiser",
    date: "Dec 6",
    tag: "01 share",
    subNotes: [],
  },
  {
    title: "Project Plan",
    author: "Bud Wiser",
    date: "Dec 4",
    tag: "Only You",
    subNotes: [],
  },
];

function NotebookMain() {
  const { id } = useParams();
  const navigate = useNavigate();
  const config = notebookConfig[id] || {
    title: id?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "Your notebook",
    icon: "📁",
  };

  const [notes, setNotes] = useState(dummyNotes);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (note, e) => {
    e.stopPropagation();
    setSelectedNote(note);
    setNewTitle(note.title);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setNotes(notes.map((n) => (n === selectedNote ? { ...n, title: newTitle } : n)));
    setShowEditModal(false);
    setSelectedNote(null);
  };

  const handleDeleteClick = (note, e) => {
    e.stopPropagation();
    setSelectedNote(note);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setNotes(notes.filter((n) => n !== selectedNote));
    setShowDeleteModal(false);
    setSelectedNote(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setNotes([
      ...notes,
      {
        title: newTitle,
        author: "Bud Wiser",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        tag: "Only You",
        subNotes: [],
      },
    ]);
    setNewTitle("");
    setShowCreateModal(false);
  };

  return (
    <main className="p-4 lg:p-6 flex-1">

      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiArrowLeft />
          </button>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
            style={{ backgroundColor: "#f0f9f9" }}
          >
            {config.icon}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{config.title}</h1>
            <p className="text-xs text-gray-400">{config.description} · {notes.length} folders</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className={`flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 transition-all duration-200 ${showSearch ? "w-48" : "w-9"} overflow-hidden`}>
            <FaSearch
              className="text-gray-400 text-sm flex-shrink-0 cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && (
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-sm outline-none w-full text-gray-600 placeholder-gray-400"
                autoFocus
              />
            )}
          </div>

          {/* New Folder Button */}
          <button
            onClick={() => { setNewTitle(""); setShowCreateModal(true); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: "#002c2f" }}
          >
            <FaPlus className="text-xs" />
            New Folder
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">

          {/* Table Header */}
          <div
            className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-white uppercase tracking-wide min-w-[600px]"
            style={{ backgroundColor: "#002c2f" }}
          >
            <div className="col-span-4">Title</div>
            <div className="col-span-3">Created By</div>
            <div className="col-span-2">Updated</div>
            <div className="col-span-2">Shared With</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100 min-w-[600px]">
            {filteredNotes.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="text-gray-400 text-sm">No notebooks found</p>
                <button
                  onClick={() => { setNewTitle(""); setShowCreateModal(true); }}
                  className="mt-3 text-sm font-medium"
                  style={{ color: "#1e646e" }}
                >
                  + Create your first folder
                </button>
              </div>
            ) : (
              filteredNotes.map((note, index) => (
                <div key={index}>
                  {/* Main Row */}
                  <div
                    className="grid grid-cols-12 px-5 py-4 items-center cursor-pointer hover:bg-gray-50 transition-colors group"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                        {openIndex === index ? (
                          <IoIosArrowUp className="text-sm" style={{ color: "#1e646e" }} />
                        ) : (
                          <IoIosArrowDown className="text-sm" />
                        )}
                      </div>
                      {openIndex === index ? (
                        <FaFolderOpen className="text-base flex-shrink-0" style={{ color: "#1e646e" }} />
                      ) : (
                        <FaFolder className="text-base text-gray-400 flex-shrink-0" />
                      )}
                      <span className="text-sm font-medium text-gray-800 truncate">{note.title}</span>
                    </div>

                    <div className="col-span-3 flex items-center gap-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(note.author)}&background=1e646e&color=fff&size=28`}
                        alt={note.author}
                        className="w-7 h-7 rounded-full flex-shrink-0"
                      />
                      <span className="text-sm text-gray-600 truncate">{note.author}</span>
                    </div>

                    <div className="col-span-2">
                      <span className="text-sm text-gray-500">{note.date}</span>
                    </div>

                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                        note.tag === "Only You"
                          ? "bg-gray-100 text-gray-500"
                          : "bg-teal-50 text-teal-700"
                      }`}>
                        {note.tag !== "Only You" && <HiOutlineShare className="text-xs" />}
                        {note.tag}
                      </span>
                    </div>

                    <div className="col-span-1 flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => handleEditClick(note, e)}
                        className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-500 transition-colors"
                      >
                        <FaEdit className="text-xs" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(note, e)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>

                  {/* Sub Notes */}
                  {openIndex === index && (
                    <div style={{ backgroundColor: "#f9fafb" }}>
                      {note.subNotes && note.subNotes.length > 0 ? (
                        note.subNotes.map((sub, subIndex) => (
                          <div
                            key={subIndex}
                            className="grid grid-cols-12 px-5 py-3 items-center border-t border-gray-100 hover:bg-gray-100 transition-colors"
                          >
                            <div className="col-span-4 flex items-center gap-3 pl-10">
                              <FaFolder className="text-xs text-gray-300 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{sub.title}</span>
                            </div>
                            <div className="col-span-3 text-sm text-gray-500">{sub.author}</div>
                            <div className="col-span-2 text-sm text-gray-500">{sub.date}</div>
                            <div className="col-span-2">
                              <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                                {sub.tag}
                              </span>
                            </div>
                            <div className="col-span-1" />
                          </div>
                        ))
                      ) : (
                        <div className="px-5 py-3 pl-20 text-sm text-gray-400 border-t border-gray-100">
                          No sub-notes in this folder
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" style={{ animation: "fadeSlideUp 0.3s ease forwards" }}>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Create New Folder</h3>
            <p className="text-sm text-gray-400 mb-5">Add a new folder to <span className="font-medium text-gray-600">{config.title}</span></p>
            <form onSubmit={handleCreate}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Week 1 Notes"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                autoFocus
              />
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-colors"
                  style={{ backgroundColor: "#002c2f" }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" style={{ animation: "fadeSlideUp 0.3s ease forwards" }}>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Edit Folder</h3>
            <p className="text-sm text-gray-400 mb-5">Update the folder name</p>
            <form onSubmit={handleEditSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                autoFocus
              />
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-colors"
                  style={{ backgroundColor: "#002c2f" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" style={{ animation: "fadeSlideUp 0.3s ease forwards" }}>
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Delete Folder</h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              Are you sure you want to delete <span className="font-medium text-gray-700">"{selectedNote?.title}"</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

export default NotebookMain;