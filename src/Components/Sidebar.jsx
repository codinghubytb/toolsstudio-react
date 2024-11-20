import React from "react";
import { Link } from 'react-router-dom'; // Import du composant Link
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const closeSidebar = () => {
    toggleSidebar(false);
  }

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li onClick={closeSidebar}><Link to="/" >Home</Link></li>
        <li><Link to="/tools" onClick={closeSidebar}>Tools</Link></li>
        <li><Link to="/tools-for-developer" onClick={closeSidebar}>Tools For Developer</Link></li>
        <li><Link to="/image-transform" onClick={closeSidebar}>Image Transform</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
