import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Outlet } from "react-router-dom";
import { dummyNotes } from "./DummyNotes";
import { noteColors } from "../../utils/Color";

function Binmain() {
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * noteColors.length);
    return noteColors[randomIndex];
  };
  return (
    <main className="pt-20 p-4 max-w-1xl mx-auto w-full space-y-4">
        <section className="flex justify-between items-center w-full px-3 py-3">
          <div className="flex justify-between items-stretch w-full space-x-7">
            
                <div className="border rounded p-6 flex justify-between items-center w-full">
                    <div className="text-2xl">
                            <h1>Your Deleted Notes</h1>
                    </div>
                    <button className="border border-gray-500 pr-3 pl-3 pt-2 pb-2 rounded-lg text-gray-800 hover:bg-black hover:text-white transition">
                        Empty Bin
                    </button>

                </div>

               <div className="hidden md:flex text-4xl bg-white w-20 p-4 items-center justify-between space-x-1 border rounded-lg">
                    <MdOutlineMailOutline />
                    <IoMdNotificationsOutline />
                </div>
            </div>

        </section>

        <section className="bg-white border rounded-lg p-1">
          <div className="p-3">
            

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {dummyNotes.slice(0, 6).map((notes) => (
                <div
                  key={notes.id}
                  className={`p-6 space-y-4 rounded-2xl shadow-sm ${getRandomColor()} hover:shadow-md transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex justify-between items-center">
                    <MdOutlineMailOutline className="text-4xl p-2 border-1 border-blue-500 rounded-lg" />
                    <IoMdNotificationsOutline />
                  </div>
                  <div>
                    <h2 className="text-2xl">{notes.title}</h2>
                    <p className="mt-3 text-sm">{notes.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <MdOutlineMailOutline />
                      <p>{notes.share}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IoMdNotificationsOutline />
                      <p>{notes.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 👇 Place where routes like Home will render */}
        <div className="mt-10">
          <Outlet />
        </div>
      </main>
  )
}

export default Binmain
