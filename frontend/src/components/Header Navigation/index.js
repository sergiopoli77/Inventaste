import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import '../../assets/styles/HeaderNavigation.css';
import { FaSignOutAlt, FaChartBar, FaWarehouse, FaUserCircle } from "react-icons/fa";
import { logout } from "../../utils/auth";

const HeaderNavigation = ({ userName, onLogout }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="header-navigation">
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo">
            <FaWarehouse size={24} />
            <span>Inventaste</span>
          </div>
          
          <Link to="/dashboard" className="nav-link">
            <FaChartBar className="nav-icon" />
            <span>Dashboard</span>
          </Link>
          
          <div className="dropdown">
            <button 
              className="dropbtn" 
              onClick={() => toggleDropdown('inventory')}
              aria-expanded={activeDropdown === 'inventory'}
            >
              <FaWarehouse className="nav-icon" />
              <span>Inventory</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className={`dropdown-content ${activeDropdown === 'inventory' ? 'show' : ''}`}>
              <Link to="/kitchen">Kitchen Management</Link>
              <Link to="/service">Service Items</Link>
            </div>
          </div>
        </div>
        
        <div className="nav-right">
          <div className="user-profile">
            <FaUserCircle size={22} className="user-icon" />
            <span className="user-name">Hi, {userName}</span>
          </div>
          <button className="logout-btn" onClick={logout} aria-label="Logout">
            <FaSignOutAlt size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;