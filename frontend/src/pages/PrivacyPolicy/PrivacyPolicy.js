import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/PolicyPages.css';
const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-hero">
        <div className="container">
          <h1 className="policy-title">Privacy Policy</h1>
          <p className="policy-subtitle">Last updated: December 2024</p>
        </div>
      </div>

      <div className="container">
        <div className="policy-content">
          <div className="policy-sidebar">
            <nav className="policy-nav">
              <h4>Quick Navigation</h4>
              <a href="#information-collection" className="nav-link">Information We Collect</a>
              <a href="#how-we-use" className="nav-link">How We Use Information</a>
              <a href="#data-sharing" className="nav-link">Data Sharing</a>
              <a href="#data-security" className="nav-link">Data Security</a>
              <a href="#your-rights" className="nav-link">Your Rights</a>
              <a href="#contact" className="nav-link">Contact Us</a>
            </nav>
          </div>

          <div className="policy-main">
            <section id="information-collection" className="policy-section">
              <h2>Information We Collect</h2>
              <div className="policy-card">
                <h3>Personal Information</h3>
                <p>When you use our services, we may collect:</p>
                <ul>
                  <li>Name and contact details (email, phone number)</li>
                  <li>Vehicle information (make, model, year)</li>
                  <li>Service preferences and booking history</li>
                  <li>Billing and payment information</li>
                  <li>Location data for mobile service provision</li>
                </ul>
              </div>

              <div className="policy-card">
                <h3>Automated Collection</h3>
                <p>We automatically collect certain information when you visit our website:</p>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website details</li>
                </ul>
              </div>
            </section>

            <section id="how-we-use" className="policy-section">
              <h2>How We Use Your Information</h2>
              <div className="policy-card">
                <h3>Service Provision</h3>
                <ul>
                  <li>Process and manage your bookings</li>
                  <li>Provide mobile car detailing services</li>
                  <li>Communicate service updates and changes</li>
                  <li>Process payments and send invoices</li>
                </ul>
              </div>

              <div className="policy-card">
                <h3>Communication</h3>
                <ul>
                  <li>Send service confirmations and reminders</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Send promotional offers (with your consent)</li>
                  <li>Request feedback and reviews</li>
                </ul>
              </div>
            </section>

            <section id="data-sharing" className="policy-section">
              <h2>Data Sharing and Disclosure</h2>
              <div className="policy-card">
                <p>We do not sell your personal information to third parties. We may share your information with:</p>
                <ul>
                  <li>Service providers who assist in our operations</li>
                  <li>Payment processors for transaction handling</li>
                  <li>Legal authorities when required by law</li>
                  <li>Professional advisors under confidentiality agreements</li>
                </ul>
              </div>
            </section>

            <section id="data-security" className="policy-section">
              <h2>Data Security</h2>
              <div className="policy-card">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul>
                  <li>Encryption of sensitive data during transmission</li>
                  <li>Secure storage systems with access controls</li>
                  <li>Regular security assessments and updates</li>
                  <li>Staff training on data protection practices</li>
                </ul>
              </div>
            </section>

            <section id="your-rights" className="policy-section">
              <h2>Your Rights</h2>
              <div className="policy-card">
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal information we hold</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your data</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </section>

            <section id="contact" className="policy-section">
              <h2>Contact Us</h2>
              <div className="policy-card">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="contact-details">
                  <p><strong>Email:</strong> privacy@luxegoautospa.com</p>
                  <p><strong>Phone:</strong> +44 7721482404</p>
                  <p><strong>Address:</strong> Chelmsford, Essex, United Kingdom</p>
                </div>
              </div>
            </section>

            <div className="policy-actions">
              <Link to="/terms" className="policy-btn secondary">View Terms of Service</Link>
              <Link to="/" className="policy-btn primary">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;