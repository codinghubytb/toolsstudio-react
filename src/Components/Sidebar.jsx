import React from "react";
import { Link } from 'react-router-dom'; // Import du composant Link
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const closeSidebar = () => {
    toggleSidebar(false);
  }

  return (    
    <aside className={`sidebar ${isOpen ? "open" : "close"}`}>

      <div className="menu-bar">
          <div className="menu">
              <ul className="menu-links">
                  <li className="nav-link">
                      <Link to="/" onClick={closeSidebar}>
                          <i className='bx bx-home icon'></i>
                          <span className="text nav-text">Home</span>
                      </Link>
                  </li>
                  <li className="nav-link">
                      <Link to=".." onClick={closeSidebar}>
                          <i className='bx bx-log-out icon'></i>
                          <span className="text nav-text">Logout</span>
                      </Link>
                  </li>
              </ul>
          </div>
      </div>
    </aside>

  );
};

export default Sidebar;
