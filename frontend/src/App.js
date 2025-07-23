import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import FloodMap from "./components/FloodMap";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      {/* <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}> */}
      <div className={`main-content`}>
          <FloodMap />
      </div>
    </div>
  );

}

export default App;
