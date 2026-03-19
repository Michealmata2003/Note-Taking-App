import { useState } from "react";
import { noteColors } from "../../utils/colors";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsPin, BsShare, BsTrash, BsStar, BsPencil } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useNotes from "../../hooks/useNotes";

const filters = [
  { key: "all", label: "All" },
  { key: "shared", label: "Shared Notes" },
  { key: "pinned", label: "Pin Notes" },
  { key: "favourite", label: "Favourite Notes" },
];

// Loading skeleton card
function SkeletonCard() {
  return (
    <div className="p-5 rounded-xl bg-gray-100 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-gray-200 mb-4" />
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
      <div className="h-3 bg-gray-200 rounded mb-1 w-full" />
      <div className="h-3 bg-gray-200 rounded mb-1 w-5/6" />
      <div className="h-3 bg-gray-200 rounded w-4/6" />
    </div>
  );
}

function NotesDashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { notes, loading, error, togglePin, toggleFavourite, trashNote } =
    useNotes(activeFilter);

  const getColor = (index) => noteColors[index % noteColors.length];

  const filteredNotes = notes.filter((note) =>
    note.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="flex-1 p-4 lg:p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Section Header */}
        <div className="px-5 pt-5 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Notes</h2>
            <div className="relative">
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-teal-400 transition-all w-44"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeFilter === f.key
                    ? "border-current"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
                style={
                  activeFilter === f.key
                    ? { color: "#1e646e", borderColor: "#1e646e" }
                    : {}
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-100" />

        {/* Content */}
        <div className="p-5">
          {/* Error state */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-400 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-xs font-medium"
                style={{ color: "#1e646e" }}
              >
                Try again
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <HiOutlinePencilAlt className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-3">No notes yet</p>
              <button
                onClick={() => navigate("/notes/new?type=blank")}
                className="text-xs font-semibold px-4 py-2 rounded-lg text-white transition-colors"
                style={{ backgroundColor: "#002c2f" }}
              >
                + Create your first note
              </button>
            </div>
          )}

          {/* Notes Grid */}
          {!loading && !error && filteredNotes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note, index) => (
                <div
                  key={note._id}
                  className={`relative p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group ${getColor(index)}`}
                >
                  {/* Card Top */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white bg-opacity-70 flex items-center justify-center text-xl">
                      {note.icon || "📝"}
                    </div>
                    {/* Hover actions */}
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {/* Edit button — new */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/notes/edit/${note._id}`);
                        }}
                        className="p-1.5 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-500 hover:text-green-500 transition-colors"
                        title="Edit"
                      >
                        <BsPencil className="text-xs" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(note._id);
                        }}
                        className={`p-1.5 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors ${note.isPinned ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}`}
                        title="Pin"
                      >
                        <BsPin className="text-xs" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavourite(note._id);
                        }}
                        className={`p-1.5 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors ${note.isFavourite ? "text-yellow-500" : "text-gray-500 hover:text-yellow-500"}`}
                        title="Favourite"
                      >
                        <BsStar className="text-xs" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          trashNote(note._id);
                        }}
                        className="p-1.5 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-500 hover:text-red-500 transition-colors"
                        title="Move to trash"
                      >
                        <BsTrash className="text-xs" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 text-base mb-2">
                      {note.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {note.content ||
                        note.todoItems?.map((i) => i.text).join(", ") ||
                        ""}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-black border-opacity-5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <BsShare className="text-xs" />
                      <span>
                        {note.sharedWith?.length > 0
                          ? `${note.sharedWith.length} share`
                          : "Only You"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <IoCalendarOutline className="text-xs" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                  </div>
                  {/* <div className="flex items-center justify-between pt-3 border-t border-black border-opacity-5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <BsShare className="text-xs" />
                      <span>
                        {note.sharedWith?.length > 0
                          ? `${note.sharedWith.length} share`
                          : "Only You"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <IoCalendarOutline className="text-xs" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default NotesDashboard;
