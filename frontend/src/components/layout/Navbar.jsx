import { NavLink, Link } from "react-router-dom";
import { MdOutlineNoteAlt } from "react-icons/md";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#002c2f" }}>
            <MdOutlineNoteAlt className="text-white text-lg" />
          </div>
          <span className="text-lg font-bold text-gray-800">NotePlus</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Home</a>
          <a href="#services" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Services</a>
          <a href="#projects" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Projects</a>
          <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/signin"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: "#002c2f" }}
          >
            Get Started
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
        >
          {isOpen ? <HiX className="text-xl" /> : <HiMenuAlt3 className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <a href="#hero" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-2">Home</a>
          <a href="#services" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-2">Services</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-2">Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-2">Contact</a>
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <NavLink to="/signin" className="flex-1 text-center text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">Login</NavLink>
            <NavLink to="/signup" className="flex-1 text-center text-sm font-medium text-white px-4 py-2 rounded-lg" style={{ backgroundColor: "#002c2f" }}>Get Started</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;