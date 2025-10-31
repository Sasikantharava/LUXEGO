import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="logo.png" alt="LuxeGo Auto Spa" className="logo-image" />
            </div>
            <p className="footer-description">
              Premium mobile car detailing services in Chelmsford, Essex that bring back the showroom shine to your vehicle.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/luxego_autospa?igsh=MXhqbzIyejllMnYxMA==" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@luxego.auto.spa" className="social-link" aria-label="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://www.youtube.com/@luxegoautospa" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/services" className="footer-link">Services</Link>
              <Link to="/gallery" className="footer-link">Gallery</Link>
              <Link to="/reviews" className="footer-link">Reviews</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Our Services</h4>
            <div className="footer-links">
              <a href="#exterior" className="footer-link">Exterior Detailing</a>
              <a href="#interior" className="footer-link">Interior Detailing</a>
              <a href="#full" className="footer-link">Full Car Detailing</a>
              <a href="#ceramic" className="footer-link">Ceramic Coating</a>
              <a href="#paint" className="footer-link">Paint Correction</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone-alt contact-icon"></i>
                <div>
                  <p className="contact-label">Call Us</p>
                  <p className="contact-value">+44 7721482404</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope contact-icon"></i>
                <div>
                  <p className="contact-label">Email Us</p>
                  <p className="contact-value">info@luxegoautospa.com</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <div>
                  <p className="contact-label">Service Area</p>
                  <p className="contact-value">Chelmsford, Essex & Surrounding Areas</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock contact-icon"></i>
                <div>
                  <p className="contact-label">Working Hours</p>
                  <p className="contact-value">Mon - Sun: 8:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Luxego Auto Spa. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="privacy" className="footer-bottom-link">Privacy Policy</a>
              <a href="/terms" className="footer-bottom-link">Terms of Service</a>
              <a href="/cookies" className="footer-bottom-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;