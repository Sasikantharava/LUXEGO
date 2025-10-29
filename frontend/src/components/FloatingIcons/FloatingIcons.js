import React from 'react';
import './FloatingIcons.css';

const FloatingIcons = () => {
  return (
    <div className="floating-icons-container">
      {/* Left Side - WhatsApp */}
      <a 
        href="https://wa.me/+447721482404" 
        className="floating-icon floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp Us"
      >
        <i className="fab fa-whatsapp"></i>
        <span className="tooltip">Chat on WhatsApp</span>
      </a>
      
      {/* Right Side - Phone Call */}
      <a 
        href="tel:+447721482404" 
        className="floating-icon floating-call"
        title="Call Us"
      >
        <i className="fas fa-phone-alt"></i>
        <span className="tooltip">Call Now</span>
      </a>
    </div>
  );
};

export default FloatingIcons;