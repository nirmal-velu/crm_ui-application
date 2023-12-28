import React from 'react';
import insurance from '../assets/insuranceLogo.svg';
import Sidebar from './Sidebar'; // Import the Sidebar component
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes
import Home from '../Pages/Dashboard/Home'; // Adjust the path accordingly
import Profile from '../Pages/Dashboard/Profile';
import Settings from '../Pages/Dashboard/Settings';

interface DashboardProps { }

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div id="dashboard-container">
      {/* Header */}
      <header style={{ height: '80px', backgroundColor: '#36256E' }}>
        <div className="header-content" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <img className="insurance-log-img" src={insurance} alt="insurance" style={{ position: 'relative', bottom: '-15px', left: '14px', width: '24px' }} />
          <span style={{ color: "#FFFFFF", position: 'relative', bottom: '-17px', left: '27px', fontSize: '16px' }} className="insurance-txt">
            Insurance Company
          </span>
        </div>
      </header>

      {/* Sidebar component */}
      <Sidebar />

      {/* Main content */}
      <div>
        {/* Your main content goes here */}
        <Routes>
          {/* Define routes for the right-container content */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#36256E', color: '#FFFFFF', textAlign: 'center', padding: '20px' }}>
        <div className="footer-content">
          &copy; 2023 Insurance Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
