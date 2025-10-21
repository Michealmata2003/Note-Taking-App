import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // controls entire sidebar
  const [activeDropdown, setActiveDropdown] = useState(null); // controls dropdowns

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar,
        activeDropdown,
        toggleDropdown,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
