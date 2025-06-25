import React from 'react';
import './Navbar.css';
import { FiSearch, FiBell, FiMessageSquare, FiChevronRight } from 'react-icons/fi';
import profile from '../Assets/profile.jpeg';

const Navbar = ({ selectedView, onViewChange }) => {
  return (
    <div className="navbar">
      {/* Left: View Toggle */}
      <div className="navbar-left">
        <div className="view-toggle">
          {['Day', 'Week', 'Month'].map((view) => (
            <button
              key={view}
              className={`toggle-btn ${selectedView === view ? 'active' : ''}`}
              onClick={() => onViewChange(view)}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Center: Search */}
      <div className="navbar-search">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search for anything" />
      </div>

      {/* Right: Notifications and Profile */}
      <div className="navbar-right">
        <div className="icon-wrapper">
          <FiBell className="icon" />
          <span className="dot" />
        </div>
        <div className="icon-wrapper">
          <FiMessageSquare className="icon" />
        </div>
        <div className="profile-section">
          <img src={profile} alt="User" className="profile-img" />
          <div className="profile-text">
            <span className="name">Esther Howard</span>
            <span className="email">esther.howard@gmail.com</span>
          </div>
          <FiChevronRight className="chevron" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
