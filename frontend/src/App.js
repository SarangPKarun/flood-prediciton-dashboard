import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportsPage from "./components/ReportsPage";
import SettingsPage from "./components/SettingsPage";
import './App.css';
import Sidebar from './components/Sidebar';
import FloodMap from "./components/FloodMap";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✅ Layer visibility states
  const [activeLayer, setActiveLayer] = useState(null);


  const features = [
    "dem_cog",
    "slope_cog",
    "aspect_cog",
    "curvenumber_cog",
    "diststream_4326",
    "lulc_cog",
    "profilecurvature_cog",
    "rainfalldepth_cog",
    "spi_cog",
    "streamdensity_cog",
    "twi_cog",
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
    <div className="app">
      <Sidebar 
      isOpen={isSidebarOpen} 
      toggleSidebar={toggleSidebar}
      features={features}
      activeLayer={activeLayer}
      setActiveLayer={setActiveLayer}/>
      {/* <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}> */}
      <div className={`main-content`}>
          {/* <FloodMap /> */}
          {/* <TiffLayer /> */}
          <Routes>
            {/* Dashboard (default) */}
            <Route path="/" element={<FloodMap activeLayer={activeLayer}/>} />

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
