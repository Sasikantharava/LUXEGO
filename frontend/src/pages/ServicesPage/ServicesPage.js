import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ServicesPage.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      // Separate main services and additional services
      const mainServices = response.data.filter(service => 
        !service.title.toLowerCase().includes('headlight') &&
        !service.title.toLowerCase().includes('engine') &&
        !service.title.toLowerCase().includes('fabric') &&
        !service.title.toLowerCase().includes('paint correction')
      );
      const additional = response.data.filter(service => 
        service.title.toLowerCase().includes('headlight') ||
        service.title.toLowerCase().includes('engine') ||
        service.title.toLowerCase().includes('fabric') ||
        service.title.toLowerCase().includes('paint correction')
      );
      
      setServices(mainServices);
      setAdditionalServices(additional);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback data
      setServices([
        {
          _id: '1',
          title: 'Basic Wash',
          price: '₹ 999',
          duration: '1-2 hours',
          features: [
            'Exterior Hand Wash',
            'Tire Cleaning',
            'Window Cleaning',
            'Interior Vacuuming'
          ],
          popular: false
        },
        {
          _id: '2',
          title: 'Premium Detailing',
          price: '₹ 2,999',
          duration: '3-4 hours',
          features: [
            'Complete Exterior Wash',
            'Wax Application',
            'Interior Deep Cleaning',
            'Tire Dressing',
            'Air Freshener'
          ],
          popular: true
        },
        {
          _id: '3',
          title: 'Executive Package',
          price: '₹ 4,999',
          duration: '5-6 hours',
          features: [
            'Premium Detailing',
            'Paint Protection',
            'Leather Conditioning',
            'Engine Bay Cleaning',
            'Ceramic Coating'
          ],
          popular: false
        }
      ]);
      setAdditionalServices([
        {
          _id: '4',
          title: 'Headlight Restoration',
          price: '₹ 799',
          description: 'Restore cloudy headlights to like-new condition'
        },
        {
          _id: '5',
          title: 'Engine Bay Cleaning',
          price: '₹ 1,199',
          description: 'Deep clean and degrease engine compartment'
        },
        {
          _id: '6',
          title: 'Fabric Protection',
          price: '₹ 1,499',
          description: 'Advanced fabric protection against stains'
        }
      ]);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="services-page">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="services-page">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress"></div>

      {/* Enhanced Hero Section */}
      <section className="services-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-particles">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${12 + Math.random() * 8}s`
              }}></div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="hero-content fade-in" data-aos="fade-up">
            <div className="section-badge">Our Services</div>
            <h1 className="hero-title">
              <span className="hero-gradient-text">Premium Auto</span>
              <span className="hero-accent-text">Detailing Services</span>
            </h1>
            <p className="lead">
              From basic washes to premium ceramic coatings, we offer comprehensive 
              detailing solutions tailored to your vehicle's needs and your budget.
            </p>
            <div className="hero-features">
              <div className="feature">
                <div className="feature-icon">⭐</div>
                <span>Certified Professionals</span>
              </div>
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <span>Quick & Efficient</span>
              </div>
              <div className="feature">
                <div className="feature-icon">💎</div>
                <span>Premium Quality</span>
              </div>
            </div>
            <Link to="/contact" className="btn btn-glow btn-large">
              <span className="btn-gradient">Book a Service</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Service Packages */}
      <section className="pricing-section section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text fade-in" data-aos="fade-up">
              Service Packages
            </h2>
            <p className="section-subtitle fade-in" data-aos="fade-up" data-aos-delay="200">
              Choose the perfect package for your vehicle
            </p>
          </div>

          <div className="pricing-grid">
            {services.map((service, index) => (
              <div 
                key={service._id} 
                className={`pricing-card glass-card float-up ${service.popular ? 'popular' : ''}`}
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                onMouseEnter={() => setActiveService(service._id)}
                onMouseLeave={() => setActiveService(null)}
              >
                {service.popular && <div className="popular-badge">Most Popular</div>}
                
                <div className="pricing-header">
                  <div className="service-icon">
                    {service.title.includes('Basic') ? '🚿' : 
                     service.title.includes('Premium') ? '✨' : '👑'}
                  </div>
                  <h3>{service.title}</h3>
                  <div className="price">{service.price}</div>
                  <div className="duration">{service.duration}</div>
                </div>
                
                <ul className="features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="pricing-footer">
                  <Link 
                    to="/contact" 
                    className={`btn btn-block ${service.popular ? 'btn-glow' : 'btn-outline'}`}
                  >
                    <span>{service.popular ? 'Book Now' : 'Get Quote'}</span>
                  </Link>
                </div>
                
                {service.popular && <div className="popular-glow"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Additional Services */}
      <section className="additional-services section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text fade-in" data-aos="fade-up">
              Additional Services
            </h2>
            <p className="section-subtitle fade-in" data-aos="fade-up" data-aos-delay="200">
              Enhance your detailing package with these specialized services
            </p>
          </div>

          <div className="additional-grid">
            {additionalServices.map((service, index) => (
              <div 
                key={service._id} 
                className="additional-card glass-card slide-in-left"
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="additional-icon">
                  {service.title.includes('Headlight') ? '💡' : 
                   service.title.includes('Engine') ? '🔧' : 
                   service.title.includes('Fabric') ? '🧽' : '🎨'}
                </div>
                <h4>{service.title}</h4>
                <div className="price">{service.price}</div>
                <p>{service.description}</p>
                <Link to="/contact" className="btn btn-outline btn-sm">
                  Add to Booking
                </Link>
                <div className="service-gradient-border"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="process-section section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text fade-in" data-aos="fade-up">
              Our Detailing Process
            </h2>
            <p className="section-subtitle fade-in" data-aos="fade-up" data-aos-delay="200">
              Simple steps to transform your vehicle
            </p>
          </div>
          
          <div className="process-steps">
            <div className="process-step fade-in" data-aos="fade-right">
              <div className="step-indicator">
                <div className="step-number">1</div>
                <div className="step-connector"></div>
              </div>
              <div className="step-content glass-card">
                <div className="step-icon">📞</div>
                <h3>Enquiry</h3>
                <p>
                  Reach out to us via call, WhatsApp, or our contact form to share your vehicle details and preferred services. 
                  Our team will guide you through available options and help you choose what suits best.
                </p>
              </div>
            </div>

            <div className="process-step fade-in" data-aos="fade-left">
              <div className="step-indicator">
                <div className="step-number">2</div>
                <div className="step-connector"></div>
              </div>
              <div className="step-content glass-card">
                <div className="step-icon">💰</div>
                <h3>Get Quote</h3>
                <p>
                  Based on your vehicle type and selected services, we'll provide a transparent and detailed quote — 
                  no hidden costs, just honest pricing tailored to your needs.
                </p>
              </div>
            </div>

            <div className="process-step fade-in" data-aos="fade-right">
              <div className="step-indicator">
                <div className="step-number">3</div>
                <div className="step-connector"></div>
              </div>
              <div className="step-content glass-card">
                <div className="step-icon">📅</div>
                <h3>Availability Confirmation</h3>
                <p>
                  Once you approve the quote, our team checks available time slots and confirms your booking date. 
                  We ensure flexibility and convenience to match your schedule.
                </p>
              </div>
            </div>

            <div className="process-step fade-in" data-aos="fade-left">
              <div className="step-indicator">
                <div className="step-number">4</div>
              </div>
              <div className="step-content glass-card">
                <div className="step-icon">✨</div>
                <h3>Service Day</h3>
                <p>
                  On the scheduled day, your vehicle receives the utmost care and professional detailing service. 
                  We perform a final quality check before handover to ensure 100% satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New CTA Section */}
      <section className="services-cta section">
        <div className="cta-gradient-bg"></div>
        <div className="container">
          <div className="cta-content fade-in" data-aos="zoom-in">
            <div className="cta-badge">Ready to Transform Your Vehicle?</div>
            <h2>Book Your Detailing Service Today</h2>
            <p>Experience the Luxego Auto Care difference with our premium detailing services</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-glow btn-large">
                <span className="btn-gradient">Book Appointment</span>
              </Link>
              <Link to="/gallery" className="btn btn-outline btn-large">
                <span>View Our Work</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="floating-particles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;