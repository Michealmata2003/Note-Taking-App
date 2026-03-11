import { useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DummyProjects from './DummyProjects'

function Projectsmain() {
        const [openIndex, setOpenIndex] = useState(null);
        const [notes, setNotes] = useState(DummyProjects);
        const [showEditModal, setShowEditModal] = useState(false);
        const [showDeleteModal, setShowDeleteModal] = useState(false);
        const [selectedNote, setSelectedNote] = useState(null);
        const [newTitle, setNewTitle] = useState("");

        const toggleDropdown = (index) => {
            setOpenIndex(openIndex === index ? null : index)
        }

        // --- Edit ---
        const handleEditClick = (note) => {
            setSelectedNote(note);
            setNewTitle(note.title);
            setShowEditModal(true);
        };

        const handleEditSubmit = (e) => {
            e.preventDefault();
            setNotes(
            notes.map((note) =>
                note === selectedNote ? { ...note, title: newTitle } : note
            )
            );
            setShowEditModal(false);
            setSelectedNote(null);
        };

        // --- Delete ---
        const handleDeleteClick = (note) => {
            setSelectedNote(note);
            setShowDeleteModal(true);
        };

        const confirmDelete = () => {
            setNotes(notes.filter((note) => note !== selectedNote));
            setShowDeleteModal(false);
            setSelectedNote(null);
        };
 

  return (
    <>

        <section className="mt-20 flex justify-between items-center w-full px-3 py-3">
          <div className="flex justify-between items-stretch w-full space-x-7">
            
                <div className="border rounded p-4 flex justify-between items-center w-full">
                    <div className="text-2xl">
                            <h1>Project Plans</h1>
                    </div>
                    <div>
                        <FaPlus />
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaSearch className="hover: cursor-pointer" />
                        <button className="flex items-center border border-gray-500 pr-3 pl-3 pt-2 pb-2 rounded-lg text-gray-800 space-x-4 hover:bg-black hover:text-white transition">
                        <div><FaPlus/></div>
                        <div>New Folder</div>
                        </button>
                    </div>
                </div>

               <div className="hidden md:flex text-4xl bg-white w-20 p-4 items-center justify-between space-x-1 border rounded-lg">
                    <MdOutlineMailOutline />
                    <IoMdNotificationsOutline />
                </div>
            </div>

        </section>


        <section className="min-h-screen bg-gray-50 py-10 px-4">
        <div className=" mx-auto bg-white rounded-2xl shadow-md p-6">
            

            {/* Table Headings */}
            <div className="grid grid-cols-5 font-semibold text-white border-b px-3 py-3 mb-3 bg-cyan-900 rounded-t">
                <p>TITLE</p>
                <p>CREATED BY</p>
                <p>UPDATED</p>
                <p>SHARED WITH</p>
                <p>ACTIONS</p>
            </div>

            {/* Notes List */}
            <div className="space-y-2">
            {DummyProjects.map((note, index) => (
                <div
                key={index}
                >
                {/* Main Note Row */}
                <div
                    className="grid grid-cols-5 items-center cursor-pointer p-3 w-full border-b border-gray-300 py-3"
                    onClick={() => toggleDropdown(index)}
                >
                    <div className="flex items-center gap-2 py-6">
                    {openIndex === index ? (
                        <IoIosArrowUp className="text-blue-500 text-lg cursor-pointer" />
                    ) : (
                        <IoIosArrowDown className="text-gray-400 text-lg cursor-pointer " />
                    )}
                    <p className="">{note.title}</p>
                    </div>
                    <div>
                        <p className="">{note.author}</p>
                    </div>
                    <div>
                        <p className="">{note.date}</p>
                    </div>
                    <div>
                        <p className="">{note.tag}</p>
                    </div>
                    
                    <div>
                        {/* Action Icons */}
                        <div className="flex gap-3 justify-end">
                            <FaEdit
                            className="text-green-500 cursor-pointer hover:scale-110 transition-transform"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(note);
                            }}
                            />
                            <FaTrash
                            className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(note);
                            }}
                            />
                        </div>
                    </div>

                </div>

                {/* Sub Notes (Dropdown) */}
                    {openIndex === index && (
                    <div className="pl-10 space-y-1" >
                        {note.subNotes.map((sub, subIndex) => (
                        <div key={subIndex} className="grid grid-cols-4 py-6 w-full border-b border-gray-300 py-3">
                            <div className="flex items-center gap-2">
                                <p>{sub.title}</p>
                            </div>
                            <p>{sub.author}</p>
                            <p>{sub.date}</p>
                            <div className="flex items-center gap-2">
                                {sub.tag && <IoIosArrowUp className="text-blue-500" />}
                                <p>{sub.tag}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
            ))}
            </div>
            </div>
        </section>
    </>
    
    
        
  )
}

export default Projectsmain
