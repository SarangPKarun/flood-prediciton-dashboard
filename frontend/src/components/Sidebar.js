import React, { useState } from 'react';
import './Sidebar.css';
import logo from "../assets/fullicon.png";
// import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";


const Sidebar = ({ isOpen, toggleSidebar, features, activeLayer, setActiveLayer }) => {
  const [layersOpen, setLayersOpen] = useState(false);

  const toggleLayers = () => {
    setLayersOpen(!layersOpen);

    // If collapsing the main Layers menu, clear the active layer
    if (layersOpen) setActiveLayer(null);
  };


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
        
        {/* Layers collapsible menu */}
        <li className="sidebar-item">
          <div className="layer-header" onClick={toggleLayers}>
            🌍 Layers {layersOpen ? "▲" : "▼"}
          </div>

          {layersOpen && (
            <ul className="sublayers">
              {features.map((f) => (
                <li
                  key={f}
                  className={`sidebar-subitem ${activeLayer === f ? "active" : ""}`}
                  onClick={() => setActiveLayer(f)}
                >
                  {f}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="sidebar-item"><a href="#alerts">Predict Flood</a></li>
        <li className="sidebar-item"><Link to="/reports">Reports</Link></li>
        <li className="sidebar-item"><Link to="/settings">Settings</Link></li>
      </ul>

    </div>

     
  );
};
export default Sidebar; 