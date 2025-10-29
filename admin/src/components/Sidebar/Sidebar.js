import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onLogout, adminUser }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/bookings', icon: '📅', label: 'Bookings' },
    { path: '/contacts', icon: '👥', label: 'Contacts' },
    { path: '/reviews', icon: '⭐', label: 'Reviews' },
    { path: '/about', icon: '🏢', label: 'About Management' },
    { path: '/services-management', icon: '🛠️', label: 'Services Management' },
    { path: '/gallery-management', icon: '🖼️', label: 'Gallery Management' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Header Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileOpen(true)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-image1">
              {/* <img src="logo.png" alt="EliteAuto Care" /> */}
            </div>
            {!isCollapsed && (
              <div className="logo-text">
                <img src="logo.png" alt="EliteAuto Care" className="logo-full" />
              </div>
            )}
          </div>
          <button
            className="toggle-btn"
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d={isCollapsed ? "M9 18L15 12L9 6" : "M15 18L9 12L15 6"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={closeMobileSidebar}
                >
                  <span className="nav-icon">
                    {getMenuItemIcon(item.path)}
                  </span>
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                  {location.pathname === item.path && !isCollapsed && (
                    <span className="active-indicator"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="admin-details">
                <p className="admin-name">{adminUser?.username || 'Admin User'}</p>
                <p className="admin-role">{adminUser?.role || 'Administrator'}</p>
              </div>
            )}
          </div>
          <button
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <span className="logout-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor" />
              </svg>
            </span>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

// Helper function to get appropriate icons for menu items
const getMenuItemIcon = (path) => {
  const iconProps = { width: "20", height: "20", fill: "currentColor" };

  switch (path) {
    case '/dashboard':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      );
    case '/bookings':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
      );
    case '/contacts':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
        </svg>
      );
    case '/reviews':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    case '/about':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );
    case '/services-management':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      );
    case '/gallery-management':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 010-5 2.5 2.5 0 010 5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
        </svg>
      );
  }
};

export default Sidebar;