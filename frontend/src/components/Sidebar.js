import React from 'react';
import './Sidebar.css';
import logo from "../assets/fullicon.png";
// import { FaBars } from "react-icons/fa";
import FloodPredictor from "./FloodPredictor"
import { Link } from "react-router-dom";


const Sidebar = ({ isOpen, toggleSidebar }) => {
  if (!isOpen) {
    return (
      <button className="expand-btn" onClick={toggleSidebar}>
        ▶
      </button>
    );
  }

  return (
    <div className="sidebar open">
      <div className="sidebar-header">
        <img src={logo} alt="FloodMap Logo" className="company-logo" />
        <button className="toggle-btn" onClick={toggleSidebar}>
          ◀
        </button>
      </div>

      <ul className="sidebar-menu">
        <li className="sidebar-item"><Link to="/">Dashboard</Link></li>
        <li className="sidebar-item"><a href="#flood-data">View layers</a></li>
        <li className="sidebar-item"><a href="#alerts">Predict Flood</a></li>
        <li className="sidebar-item"><Link to="/reports">Reports</Link></li>
        <li className="sidebar-item"><Link to="/settings">Settings</Link></li>
      </ul>

    </div>

     
  );
};
export default Sidebar; 