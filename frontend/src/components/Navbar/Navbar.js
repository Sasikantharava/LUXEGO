import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-container">
          {/* LEFT: Logo */}
          <Link to="/" className="nav-logo">
            <img 
              src="/logo.png" 
              alt="LUXEGO" 
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="logo-fallback">
              <span className="logo-icon">🚗</span>
              <span className="logo-text">LUXEGO</span>
            </div>
          </Link>

          {/* RIGHT: Menu + CTA */}
          <div className="nav-right">
            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="nav-link-text">{item.label}</span>
                </Link>
              ))}

              <Link 
                to="/contact" 
                className="nav-cta-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="cta-text">Book Now</span>
              </Link>
            </div>
            {/* Mobile Toggle */}
            <div 
              className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && <div className="nav-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </>
  );
};

export default Navbar;
