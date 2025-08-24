import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="justify-between items-center shadow-sm">
      <div className="container">
        <div className=" gap-4 flex justify-between py-3 items-center">
          <div className="">
            <h3 className="text-2xl">SandNote</h3>
          </div>
          <div className="flex w-[60%] justify-between align-center">
            <nav className=" flex justify-between align-center">
              <ul className="gap-5 flex justify-between align-center">
                <nav className="space-x-6 align-center">
                  <a href="#hero" className="hover:text-blue-500">
                    Home
                  </a>
                  <a href="#services" className="hover:text-blue-500">
                    Services
                  </a>
                  <a href="#projects" className="hover:text-blue-500">
                    Projects
                  </a>
                  <a href="#contact" className="hover:text-blue-500">
                    Contact
                  </a>
                </nav>
              </ul>
            </nav>
            <div>
              <NavLink to="/">Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
