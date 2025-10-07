import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportsPage from "./components/ReportsPage";
import SettingsPage from "./components/SettingsPage";
import './App.css';
import Sidebar from './components/Sidebar';
import FloodMap from "./components/FloodMap";
import TiffLayer from './components/TiffLayer';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      {/* <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}> */}
      <div className={`main-content`}>
          {/* <FloodMap /> */}
          {/* <TiffLayer /> */}
          <Routes>
            {/* Dashboard (default) */}
            <Route path="/" element={<FloodMap />} />

            {/* Reports Page */}
            <Route path="/reports" element={<ReportsPage />} />

            {/* Settings Page */}
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
          
      </div>
    </div>
    </Router>
  );

}

export default App;
