import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Outlet } from "react-router-dom";
import { dummyNotes } from "./DummyNotes";
import { noteColors } from "../../utils/Color";

function Main({ children }) {
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * noteColors.length);
    return noteColors[randomIndex];
  };
  return (
    // Input field
    <main className="pt-20 p-4 max-w-1xl mx-auto w-full space-y-4">
      <section className="flex justify-between items-center w-full px-3 py-3">
        <div className="flex justify-between items-stretch w-full space-x-7">
          <form className="flex-1">
            <input
              type="text"
              placeholder="Note"
              className="p-5 w-full border rounded-lg outline-none"
            />
          </form>
          <div className="text-4xl bg-white w-20 p-4 flex items-center justify-between space-x-1 border rounded-lg">
            <MdOutlineMailOutline className="" />
            <IoMdNotificationsOutline />
          </div>
        </div>
      </section>

      <section className="bg-white border rounded-lg p-1">
        {/* Links */}
        <div className="p-3">
          <h1 className="text-3xl">Your Notes</h1>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-3">
            <div>
              <ul className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <li>All</li>
                <li>Sared Notes</li>
                <li>Pin Notes</li>
                <li>Favorite Notes</li>
              </ul>
            </div>
            <div className="text-xl flex space-x-6 items-center mt-4 sm:mt-0 self-start sm:self-auto">
              <MdOutlineMailOutline />
              <IoMdNotificationsOutline />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
            {dummyNotes.map((notes, index) => (
              <div key={notes.id} className={`p-6 space-y-4 border rounded-2xl shadow-sm ${getRandomColor()} hover:shadow-md transition-all duration-300 cursor-pointer`}>
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
  );
}

export default Main;
