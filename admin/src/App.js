import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';
import Bookings from './components/Bookings/Bookings';
import Contacts from './components/Contacts/Contacts';
import Reviews from './components/Reviews/Reviews';
import AboutManagement from './components/AboutManagement/AboutManagement';
import ServicesManagement from './components/ServicesManagement/ServicesManagement';
import GalleryManagement from './components/GalleryManagement/GalleryManagement';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');

    if (token && user) {
      setIsAuthenticated(true);
      setAdminUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setAdminUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  // Don't show sidebar on login page
  const showSidebar = isAuthenticated && location.pathname !== '/login';

  return (
    <div className="App">
      {showSidebar && <Sidebar onLogout={handleLogout} adminUser={adminUser} />}
      
      <main className={showSidebar ? 'with-sidebar' : ''}>
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/bookings"
            element={
              isAuthenticated ? (
                <Bookings />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/contacts"
            element={
              isAuthenticated ? (
                <Contacts />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/reviews"
            element={
              isAuthenticated ? (
                <Reviews />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/about"
            element={
              isAuthenticated ? (
                <AboutManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/services-management"
            element={
              isAuthenticated ? (
                <ServicesManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/gallery-management"
            element={
              isAuthenticated ? (
                <GalleryManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;