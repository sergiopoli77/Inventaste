import React from "react";
import { Link } from "react-router-dom"; 
import "../../assets/styles/HeaderNavigation.css";
import { FaSignOutAlt } from "react-icons/fa";

const HeaderNavigation = ({ userName, onLogout }) => {
  return (
    <header className="header-navigation">
      <nav className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          <div className="dropdown">
            <button className="dropbtn">Inventory</button>
            <div className="dropdown-content">
              <Link to="/kitchen">Kitchen</Link>
              <Link to="/service">Service</Link>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <span className="user-name">Hi, {userName}</span>
          <button className="logout-btn" onClick={onLogout}>
            <FaSignOutAlt size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderNavigation;