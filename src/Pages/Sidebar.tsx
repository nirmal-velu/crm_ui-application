import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCog } from 'react-icons/fa'; // You can use icons from react-icons library

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar" style={{ backgroundColor: '#36256E', color: '#FFF', width: '250px', height: '100vh', padding: '20px' }}>
      <div>
        <Link to="/">
          <FaHome size={20}  style={{ color: '#ffffff' }} />
          <span style={{ marginLeft: '10px' ,color:'#ffffff'}}>Dashboard</span>
        </Link>
      </div>
      <div>
        <Link to="/profile">
        <FaUser size={20} style={{ color: '#ffffff' }} />
          <span style={{ marginLeft: '10px' ,color:'#ffffff'}}>Profile</span>
        </Link>
      </div>
      <div>
        <Link to="/settings">
          <FaCog size={20}  style={{ color: '#ffffff' }}/>
          <span style={{ marginLeft: '10px' ,color:'#ffffff'}}>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
