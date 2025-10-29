import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/PolicyPages.css';

const TermsOfService = () => {
  return (
    <div className="policy-page">
      <div className="policy-hero">
        <div className="container">
          <h1 className="policy-title">Terms of Service</h1>
          <p className="policy-subtitle">Last updated: December 2024</p>
        </div>
      </div>

      <div className="container">
        <div className="policy-content">
          <div className="policy-sidebar">
            <nav className="policy-nav">
              <h4>Quick Navigation</h4>
              <a href="#agreement" className="nav-link">Agreement to Terms</a>
              <a href="#services" className="nav-link">Services Description</a>
              <a href="#bookings" className="nav-link">Bookings & Payments</a>
              <a href="#cancellations" className="nav-link">Cancellations</a>
              <a href="#liability" className="nav-link">Liability</a>
              <a href="#changes" className="nav-link">Changes to Terms</a>
            </nav>
          </div>

          <div className="policy-main">
            <section id="agreement" className="policy-section">
              <h2>Agreement to Terms</h2>
              <div className="policy-card">
                <p>By accessing and using LuxeGo Auto Spa's services, you accept and agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.</p>
              </div>
            </section>

            <section id="services" className="policy-section">
              <h2>Services Description</h2>
              <div className="policy-card">
                <h3>Mobile Car Detailing</h3>
                <p>LuxeGo Auto Spa provides premium mobile car detailing services including:</p>
                <ul>
                  <li>Exterior washing and waxing</li>
                  <li>Interior cleaning and vacuuming</li>
                  <li>Paint correction and polishing</li>
                  <li>Ceramic coating applications</li>
                  <li>Full vehicle detailing packages</li>
                </ul>
              </div>

              <div className="policy-card">
                <h3>Service Area</h3>
                <p>We currently serve Chelmsford, Essex and surrounding areas. Additional travel fees may apply for locations outside our primary service area.</p>
              </div>
            </section>

            <section id="bookings" className="policy-section">
              <h2>Bookings & Payments</h2>
              <div className="policy-card">
                <h3>Booking Process</h3>
                <ul>
                  <li>Bookings can be made online, by phone, or via email</li>
                  <li>A confirmed booking requires payment details</li>
                  <li>Same-day bookings subject to availability</li>
                  <li>We reserve the right to refuse service</li>
                </ul>
              </div>

              <div className="policy-card">
                <h3>Payment Terms</h3>
                <ul>
                  <li>Full payment due upon service completion</li>
                  <li>We accept cash, credit/debit cards, and bank transfers</li>
                  <li>Prices may vary based on vehicle size and condition</li>
                  <li>Additional charges for extra services will be communicated</li>
                </ul>
              </div>
            </section>

            <section id="cancellations" className="policy-section">
              <h2>Cancellation Policy</h2>
              <div className="policy-card">
                <h3>Cancellation by Customer</h3>
                <ul>
                  <li>24+ hours notice: No charge</li>
                  <li>Less than 24 hours: 50% service fee</li>
                  <li>No-show: Full service charge</li>
                  <li>Rescheduling: Subject to availability</li>
                </ul>
              </div>

              <div className="policy-card">
                <h3>Cancellation by LuxeGo</h3>
                <ul>
                  <li>Weather conditions affecting service quality</li>
                  <li>Unforeseen circumstances or emergencies</li>
                  <li>Safety concerns</li>
                  <li>We will provide as much notice as possible and reschedule</li>
                </ul>
              </div>
            </section>

            <section id="liability" className="policy-section">
              <h2>Liability & Warranties</h2>
              <div className="policy-card">
                <h3>Service Warranty</h3>
                <p>We guarantee our workmanship and materials. If you're not satisfied with any aspect of our service, please contact us within 48 hours for resolution.</p>
              </div>

              <div className="policy-card">
                <h3>Limitation of Liability</h3>
                <ul>
                  <li>We exercise utmost care with your vehicle</li>
                  <li>Not liable for pre-existing conditions or damages</li>
                  <li>Maximum liability limited to service cost</li>
                  <li>Not responsible for mechanical issues unrelated to detailing</li>
                </ul>
              </div>
            </section>

            <section id="changes" className="policy-section">
              <h2>Changes to Terms</h2>
              <div className="policy-card">
                <p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.</p>
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

export default TermsOfService;