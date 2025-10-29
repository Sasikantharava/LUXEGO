import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AboutPage.css';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState({
    stats: {
      workingHours: 0,
      carsDetailed: 0,
      customerSatisfaction: 0
    },
    mission: {
      mission: '',
      vision: '',
      values: ''
    },
    team: []
  });
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    workingHours: 0,
    carsDetailed: 0,
    customerSatisfaction: 0
  });
  const statsSectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/about');
      const data = response.data;
      
      setAboutData({
        stats: {
          workingHours: data.stats?.workingHours || 0,
          carsDetailed: data.stats?.carsDetailed || 0,
          customerSatisfaction: data.stats?.customerSatisfaction || 0
        },
        mission: {
          mission: data.mission || 'Delivering exceptional automotive care with precision and passion.',
          vision: data.vision || 'To be the most trusted name in automotive detailing services.',
          values: data.values?.[0]?.description || 'Quality, Integrity, and Customer Satisfaction'
        },
        team: data.team || [
          {
            name: 'Rajesh Kumar',
            role: 'Founder & Head Detailer',
            description: '15+ years of experience in automotive care and detailing.'
          },
          {
            name: 'Priya Sharma',
            role: 'Customer Relations',
            description: 'Dedicated to ensuring exceptional customer experiences.'
          },
          {
            name: 'Amit Patel',
            role: 'Senior Detail Specialist',
            description: 'Expert in paint correction and ceramic coatings.'
          }
        ]
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching about data:', error);
      setAboutData({
        stats: {
          workingHours: 12500,
          carsDetailed: 3400,
          customerSatisfaction: 98
        },
        mission: {
          mission: 'Delivering exceptional automotive care with precision and passion.',
          vision: 'To be the most trusted name in automotive detailing services.',
          values: 'Quality, Integrity, and Customer Satisfaction'
        },
        team: [
          {
            name: 'Rajesh Kumar',
            role: 'Founder & Head Detailer',
            description: '15+ years of experience in automotive care and detailing.'
          },
          {
            name: 'Priya Sharma',
            role: 'Customer Relations',
            description: 'Dedicated to ensuring exceptional customer experiences.'
          },
          {
            name: 'Amit Patel',
            role: 'Senior Detail Specialist',
            description: 'Expert in paint correction and ceramic coatings.'
          }
        ]
      });
      setLoading(false);
    }
  };

  // Number counting animation
  const animateNumbers = () => {
    if (hasAnimated) return;
    
    setHasAnimated(true);
    const duration = 2000;
    const steps = 60;

    let startTime = null;
    const finalValues = {
      workingHours: aboutData.stats.workingHours,
      carsDetailed: aboutData.stats.carsDetailed,
      customerSatisfaction: aboutData.stats.customerSatisfaction
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const workingHoursValue = Math.floor(finalValues.workingHours * progress);
      const carsDetailedValue = Math.floor(finalValues.carsDetailed * progress);
      const customerSatisfactionValue = Math.floor(finalValues.customerSatisfaction * progress);

      setAnimatedStats({
        workingHours: workingHoursValue,
        carsDetailed: carsDetailedValue,
        customerSatisfaction: customerSatisfactionValue
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedStats(finalValues);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Initialize scroll animations
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Trigger number animation when stats section is visible
          if (entry.target.classList.contains('about-hero')) {
            animateNumbers();
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .float-up, .about-hero').forEach(el => {
      observer.observe(el);
    });

    // Also observe the hero section specifically
    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, aboutData.stats]);

  if (loading) {
    return (
      <div className="about-page">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress"></div>

      {/* Enhanced Background Video */}
      <div className="video-background">
        <video autoPlay muted loop playsInline className="enhanced-video">
          <source src="https://www.pexels.com/download/video/3066463/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-gradient-overlay"></div>
        <div className="video-noise"></div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="about-hero" ref={statsSectionRef}>
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-particles">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}></div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="about-content">
            <div className="about-text fade-in" data-aos="fade-right">
              <div className="section-badge">About Us</div>
              <h1 className="hero-title">
                <span className="hero-gradient-text">Elevating Auto Care</span>
                <span className="hero-accent-text">To Perfection</span>
              </h1>
              <p className="lead">
                With over a decade of experience in automotive care, Luxego Auto Care has established 
                itself as the premier car detailing service provider, dedicated to restoring and 
                protecting your vehicle's beauty.
              </p>
              <div className="hero-features">
                <div className="feature">
                  <div className="feature-icon">⚡</div>
                  <span>Premium Quality Services</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">🛡️</div>
                  <span>Certified Professionals</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">⭐</div>
                  <span>5-Star Rated Service</span>
                </div>
              </div>
            </div>
            <div className="about-stats fade-in" data-aos="fade-left">
              <div className="stat glass-card zoom-in">
                <div className="stat-icon">⏱️</div>
                <h3>{animatedStats.workingHours.toLocaleString()}+</h3>
                <p>Working Hours</p>
                <div className="stat-progress"></div>
              </div>
              <div className="stat glass-card zoom-in" data-aos-delay="100">
                <div className="stat-icon">🚗</div>
                <h3>{animatedStats.carsDetailed.toLocaleString()}+</h3>
                <p>Cars Detailed</p>
                <div className="stat-progress"></div>
              </div>
              <div className="stat glass-card zoom-in" data-aos-delay="200">
                <div className="stat-icon">😊</div>
                <h3>{animatedStats.customerSatisfaction}%</h3>
                <p>Customer Satisfaction</p>
                <div className="stat-progress"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section className="mission-section section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text fade-in" data-aos="fade-up">
              Our Philosophy
            </h2>
            <p className="section-subtitle fade-in" data-aos="fade-up" data-aos-delay="200">
              Driving excellence in every detail
            </p>
          </div>
          
          <div className="mission-grid">
            <div className="mission-card glass-card float-up" data-aos="fade-up">
              <div className="mission-icon-wrapper">
                <div className="mission-icon-bg"></div>
                <div className="mission-icon">🎯</div>
              </div>
              <h3>Our Mission</h3>
              <p>{aboutData.mission.mission}</p>
              <div className="mission-gradient-border"></div>
            </div>
            <div className="mission-card glass-card float-up" data-aos="fade-up" data-aos-delay="200">
              <div className="mission-icon-wrapper">
                <div className="mission-icon-bg"></div>
                <div className="mission-icon">👁️</div>
              </div>
              <h3>Our Vision</h3>
              <p>{aboutData.mission.vision}</p>
              <div className="mission-gradient-border"></div>
            </div>
            <div className="mission-card glass-card float-up" data-aos="fade-up" data-aos-delay="400">
              <div className="mission-icon-wrapper">
                <div className="mission-icon-bg"></div>
                <div className="mission-icon">💎</div>
              </div>
              <h3>Our Values</h3>
              <p>{aboutData.mission.values}</p>
              <div className="mission-gradient-border"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="team-section section content-overlay">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text fade-in" data-aos="fade-up">
              Meet Our Expert Team
            </h2>
            <p className="section-subtitle fade-in" data-aos="fade-up" data-aos-delay="200">
              Skilled professionals passionate about automotive perfection
            </p>
          </div>
          
          <div className="team-grid">
            {aboutData.team.map((member, index) => (
              <div 
                key={index} 
                className="team-member glass-card slide-in-left" 
                data-aos="fade-up" 
                data-aos-delay={300 + (index * 100)}
              >
                <div className="member-image">
                  <div className="image-glow"></div>
                  <div className="image-placeholder">
                    {member.name.includes('Rajesh') ? '👨‍💼' : 
                     member.name.includes('Priya') ? '👩‍💼' : '👨‍🔧'}
                  </div>
                  <div className="member-overlay">
                    <div className="social-links">
                      <span className="social-link">📱</span>
                      <span className="social-link">💼</span>
                      <span className="social-link">📧</span>
                    </div>
                  </div>
                </div>
                <h4>{member.name}</h4>
                <p className="role">{member.role}</p>
                <p className="member-description">{member.description}</p>
                <div className="member-skills">
                  <span className="skill-tag">Detailing</span>
                  <span className="skill-tag">Quality</span>
                  <span className="skill-tag">Care</span>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced No Team Message */}
          {aboutData.team.length === 0 && (
            <div className="no-team-message glass-card fade-in" data-aos="fade-up">
              <div className="no-team-icon">👥</div>
              <h3>Our Team</h3>
              <p>Meet our dedicated team of automotive care professionals</p>
            </div>
          )}
        </div>
      </section>

      {/* New Process Section */}
      <section className="process-section section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text fade-in" data-aos="fade-up">
              Our Process
            </h2>
            <p className="section-subtitle fade-in" data-aos="fade-up" data-aos-delay="200">
              How we deliver exceptional results every time
            </p>
          </div>
          
          <div className="process-steps">
            <div className="process-step fade-in" data-aos="fade-up">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Consultation & Assessment</h3>
                <p>We begin with a thorough assessment of your vehicle's condition and discuss your specific needs and expectations.</p>
              </div>
            </div>
            <div className="process-step fade-in" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Precision Detailing</h3>
                <p>Our certified professionals use premium products and techniques to restore your vehicle's showroom shine.</p>
              </div>
            </div>
            <div className="process-step fade-in" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Quality Inspection</h3>
                <p>Every vehicle undergoes a rigorous quality check to ensure perfection before delivery.</p>
              </div>
            </div>
            <div className="process-step fade-in" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Customer Delivery</h3>
                <p>We present your transformed vehicle and provide aftercare guidance for long-lasting results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;