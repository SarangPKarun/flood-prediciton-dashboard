import React from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import logo from "../assets/fullicon.png";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {/* {isSidebarOpen ? '←' : '→'} */}
          <FaBars size={20} className="menu-icon" />
        </button>
        {/* <h1 className="navbar-title">Flood Dashboard</h1> */}
        <img src={logo} alt="FloodMap Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <div className="navbar-user">
          <span>Home</span>
          <span>Report</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
