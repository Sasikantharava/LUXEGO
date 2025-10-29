import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/PolicyPages.css';

const CookiePolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-hero">
        <div className="container">
          <h1 className="policy-title">Cookie Policy</h1>
          <p className="policy-subtitle">Last updated: December 2024</p>
        </div>
      </div>

      <div className="container">
        <div className="policy-content">
          <div className="policy-sidebar">
            <nav className="policy-nav">
              <h4>Quick Navigation</h4>
              <a href="#what-are-cookies" className="nav-link">What Are Cookies</a>
              <a href="#how-we-use-cookies" className="nav-link">How We Use Cookies</a>
              <a href="#types-of-cookies" className="nav-link">Types of Cookies</a>
              <a href="#managing-cookies" className="nav-link">Managing Cookies</a>
              <a href="#updates" className="nav-link">Policy Updates</a>
            </nav>
          </div>

          <div className="policy-main">
            <section id="what-are-cookies" className="policy-section">
              <h2>What Are Cookies</h2>
              <div className="policy-card">
                <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.</p>
              </div>
            </section>

            <section id="how-we-use-cookies" className="policy-section">
              <h2>How We Use Cookies</h2>
              <div className="policy-card">
                <h3>Essential Cookies</h3>
                <p>These cookies are necessary for the website to function properly:</p>
                <ul>
                  <li>Session management and security</li>
                  <li>Load balancing and performance</li>
                  <li>Shopping cart functionality</li>
                  <li>User authentication</li>
                </ul>
              </div>

              <div className="policy-card">
                <h3>Analytics Cookies</h3>
                <p>These cookies help us understand how visitors interact with our website:</p>
                <ul>
                  <li>Page visitation statistics</li>
                  <li>Traffic source analysis</li>
                  <li>User behavior patterns</li>
                  <li>Website performance metrics</li>
                </ul>
              </div>

              <div className="policy-card">
                <h3>Preference Cookies</h3>
                <p>These cookies remember your settings and preferences:</p>
                <ul>
                  <li>Language preferences</li>
                  <li>Regional settings</li>
                  <li>Layout preferences</li>
                  <li>Service preferences</li>
                </ul>
              </div>
            </section>

            <section id="types-of-cookies" className="policy-section">
              <h2>Types of Cookies We Use</h2>
              <div className="policy-card">
                <div className="cookie-table">
                  <div className="cookie-row header">
                    <div className="cookie-cell">Cookie Name</div>
                    <div className="cookie-cell">Purpose</div>
                    <div className="cookie-cell">Duration</div>
                  </div>
                  <div className="cookie-row">
                    <div className="cookie-cell">session_id</div>
                    <div className="cookie-cell">User session management</div>
                    <div className="cookie-cell">Session</div>
                  </div>
                  <div className="cookie-row">
                    <div className="cookie-cell">user_preferences</div>
                    <div className="cookie-cell">Stores user settings</div>
                    <div className="cookie-cell">1 year</div>
                  </div>
                  <div className="cookie-row">
                    <div className="cookie-cell">_ga</div>
                    <div className="cookie-cell">Google Analytics</div>
                    <div className="cookie-cell">2 years</div>
                  </div>
                  <div className="cookie-row">
                    <div className="cookie-cell">_gid</div>
                    <div className="cookie-cell">Google Analytics</div>
                    <div className="cookie-cell">24 hours</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="managing-cookies" className="policy-section">
              <h2>Managing Cookies</h2>
              <div className="policy-card">
                <h3>Browser Controls</h3>
                <p>You can control and manage cookies through your browser settings:</p>
                <ul>
                  <li>Delete existing cookies</li>
                  <li>Block all or specific cookies</li>
                  <li>Set preferences for different websites</li>
                  <li>Receive notifications when cookies are set</li>
                </ul>
              </div>

              <div className="policy-card">
                <h3>Opt-Out Options</h3>
                <p>You can opt-out of specific cookie types:</p>
                <ul>
                  <li>Analytics cookies through Google Analytics opt-out</li>
                  <li>Advertising cookies through industry opt-out tools</li>
                  <li>Preference cookies through our cookie consent tool</li>
                </ul>
              </div>

              <div className="policy-card">
                <h3>Consequences of Disabling</h3>
                <p>Please note that disabling cookies may affect website functionality:</p>
                <ul>
                  <li>Some features may not work properly</li>
                  <li>Preferences won't be saved</li>
                  <li>You may need to re-enter information</li>
                  <li>Certain services may be unavailable</li>
                </ul>
              </div>
            </section>

            <section id="updates" className="policy-section">
              <h2>Policy Updates</h2>
              <div className="policy-card">
                <p>We may update this Cookie Policy from time to time. We will notify you of any significant changes by posting the new policy on our website with an updated revision date.</p>
              </div>
            </section>

            <div className="policy-actions">
              <Link to="/privacy" className="policy-btn secondary">View Privacy Policy</Link>
              <Link to="/" className="policy-btn primary">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;