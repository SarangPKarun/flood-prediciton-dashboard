import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <a href="#dashboard">Dashboard</a>
          </li>
          <li className="sidebar-item">
            <a href="#flood-data">Flood Data</a>
          </li>
          <li className="sidebar-item">
            <a href="#alerts">Alerts</a>
          </li>
          <li className="sidebar-item">
            <a href="#reports">Reports</a>
          </li>
          <li className="sidebar-item">
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 