import { useState } from "react";
import { Outlet } from "react-router-dom";
import { dummyNotes } from "./DummyNotes";
import { noteColors } from "../../utils/Color";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsPin, BsShare, BsTrash, BsStar } from "react-icons/bs";
import { MdOutlineFolder } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";

function Main() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "All" },
    { key: "shared", label: "Shared Notes" },
    { key: "pinned", label: "Pin Notes" },
    { key: "favourite", label: "Favourite Notes" },
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * noteColors.length);
    return noteColors[randomIndex];
  };

  return (
    <main className="flex-1 p-4 lg:p-6">

      {/* Write Note Input Bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          <HiOutlinePencilAlt className="text-gray-400 text-lg" />
        </div>
        <input
          type="text"
          placeholder="Write Your Note..."
          className="flex-1 text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
        />
        <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
          <button className="text-xs text-gray-500 hover:text-indigo-500 flex items-center gap-1 transition-colors">
            <MdOutlineFolder className="text-base" />
            <span className="hidden sm:inline">Folder</span>
          </button>
          <button className="text-xs text-gray-500 hover:text-indigo-500 flex items-center gap-1 transition-colors">
            <BsShare className="text-sm" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button className="text-xs text-gray-500 hover:text-indigo-500 flex items-center gap-1 transition-colors">
            <BsStar className="text-sm" />
            <span className="hidden sm:inline">Favourite</span>
          </button>
          <button className="text-xs text-gray-500 hover:text-indigo-500 flex items-center gap-1 transition-colors">
            <BsPin className="text-sm" />
            <span className="hidden sm:inline">Pin</span>
          </button>
          <button className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors">
            <BsTrash className="text-sm" />
            <span className="hidden sm:inline">Trash</span>
          </button>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

        {/* Section Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Your Notes</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  activeFilter === f.key
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-8 pr-4 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all w-44"
            />
          </div>
        </div>

        {/* Note Cards Grid */}
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyNotes.map((note) => (
              <div
                key={note.id}
                className={`relative p-5 rounded-xl border border-transparent shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group ${getRandomColor()}`}
              >
                {/* Card Top — icon + actions */}
                <div className="flex justify-between items-start mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white bg-opacity-60 flex items-center justify-center">
                    <HiOutlinePencilAlt className="text-gray-600 text-base" />
                  </div>
                  {/* Actions — show on hover */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-1.5 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-500 hover:text-indigo-500 transition-colors">
                      <BsPin className="text-xs" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-500 hover:text-yellow-500 transition-colors">
                      <BsStar className="text-xs" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-500 hover:text-red-500 transition-colors">
                      <BsTrash className="text-xs" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1.5">{note.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{note.description}</p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-black border-opacity-5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <BsShare className="text-xs" />
                    <span>{note.share}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <IoCalendarOutline className="text-xs" />
                    <span>{note.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </main>
  );
}

export default Main;