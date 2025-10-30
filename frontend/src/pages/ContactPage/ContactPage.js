import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    vehicleModel: '',
    service: '',
    addon: '',
    bookingDate: '',
    bookingTime: '',
    requirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('https://luxego.onrender.com/api/contact', formData);
      setSubmitMessage('Booking request submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        vehicleModel: '',
        service: '',
        addon: '',
        bookingDate: '',
        bookingTime: '',
        requirements: ''
      });
    } catch (error) {
      setSubmitMessage('Error submitting form. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const mainServices = [
    'Exterior Detailing - £45',
    'Interior Detailing - £55',
    'Full Car Detailing - £95'
  ];

  const addonServices = [
    '',
    'Ceramic Coating - £75',
    'Paint Correction - £120',
    'Leather Conditioning - £25',
    'Headlight Restoration - £35',
    'Engine Bay Cleaning - £30',
    'Odor Elimination - £40'
  ];

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  return (
    <div className="contact-page">
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="https://www.pexels.com/download/video/4281147/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <section className="contact-hero section">
        <div className="container">
          <div className="hero-content-centered" data-aos="fade-up">
            <h1>Contact Us</h1>
            <p className="lead">
              Get in touch with LuxeGo Auto Spa for premium mobile valeting services in Chelmsford, Essex
            </p>
          </div>
        </div>
      </section>

      <section className="contact-form-section section">
        <div className="container">
          <div className="form-container-centered">
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group" data-aos="fade-up">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-row">
                <div className="form-group" data-aos="fade-up" data-aos-delay="100">
                  <label htmlFor="phone">Phone Number *</label>
                  <div className="phone-input">
                    <span className="country-code">+44</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your mobile number"
                      pattern="[0-9]{10}"
                    />
                  </div>
                </div>

                <div className="form-group" data-aos="fade-up" data-aos-delay="200">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-group" data-aos="fade-up" data-aos-delay="300">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address"
                />
              </div>

              <div className="form-group" data-aos="fade-up" data-aos-delay="400">
                <label htmlFor="vehicleModel">Vehicle Details/Model *</label>
                <input
                  type="text"
                  id="vehicleModel"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  required
                  placeholder="e.g., BMW 3 Series, 2020"
                />
              </div>

              <div className="form-group" data-aos="fade-up" data-aos-delay="500">
                <label htmlFor="service">Select Services *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose your main service</option>
                  {mainServices.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" data-aos="fade-up" data-aos-delay="600">
                <label htmlFor="addon">Addon Services (Optional)</label>
                <select
                  id="addon"
                  name="addon"
                  value={formData.addon}
                  onChange={handleChange}
                >
                  {addonServices.map((addon, index) => (
                    <option key={index} value={addon}>
                      {addon || 'No addon service'}
                    </option>
                  ))}
                </select>
                <p className="helper-text">Select one additional service if needed</p>
              </div>

              <div className="form-row">
                <div className="form-group" data-aos="fade-up" data-aos-delay="700">
                  <label htmlFor="bookingDate">Preferred Date *</label>
                  <input
                    type="date"
                    id="bookingDate"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group" data-aos="fade-up" data-aos-delay="800">
                  <label htmlFor="bookingTime">Preferred Time *</label>
                  <select
                    id="bookingTime"
                    name="bookingTime"
                    value={formData.bookingTime}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" data-aos="fade-up" data-aos-delay="900">
                <label htmlFor="requirements">Please Let Us Know Your Requirement</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any specific requirements, special instructions, or additional information..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-submit"
                disabled={isSubmitting}
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
              </button>

              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}
            </form>

            <div className="contact-info" data-aos="fade-left">
              <h3>Contact Info</h3>
              
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div>
                  <h4>Email Us</h4>
                  <p>info@luxegoautospa.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h4>Call Us</h4>
                  <p>+44 7721482404</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🕒</div>
                <div>
                  <h4>Hours</h4>
                  <p>Monday – Sunday</p>
                  <p>8:00 AM to 4:00 PM</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🌐</div>
                <div>
                  <h4>Follow Us</h4>
                  <div className="social-links">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-tiktok"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="service-area">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Service Area</h4>
                  <p>Mobile Valeting Service</p>
                  <p>Chelmsford, Essex & Surrounding Areas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;