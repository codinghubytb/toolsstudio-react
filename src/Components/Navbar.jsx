import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <nav className="navbar">
      <div className="container-logo">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="logo">ToolsStudio</div>
      </div>
      <button className="toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
