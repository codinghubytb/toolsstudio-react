import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <nav className="navbar">
      <div className="container-logo">
          <i className='bx bx-menu icon' onClick={toggleSidebar}></i>
        <div className="logo"  onClick={toggleSidebar}>ToolsStudio</div>
      </div>
      <i className='bx bx-moon icon' onClick={toggleDarkMode}></i>
    </nav>
  );
};

export default Navbar;
