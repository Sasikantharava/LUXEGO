import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const videoRef = useRef(null);
  const statsSectionRef = useRef(null);
  const [displayText1, setDisplayText1] = useState('');
  const [displayText2, setDisplayText2] = useState('');
  const [displayText3, setDisplayText3] = useState('');
  const [displayText4, setDisplayText4] = useState('');
  const [displayText5, setDisplayText5] = useState('');
  const [stats, setStats] = useState({
    vehicles: 0,
    satisfaction: 0,
    workingHours: 0
  });
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const fullText1 = "Elevate Your";
  const fullText2 = "Vehicle's Shine";
  const fullText3 = "Why Choose LUXEGO AUTO Care?";
  const fullText4 = "Our Premium Services";
  const fullText5 = "Ready for a Showroom Transformation?";

  // Fetch reviews and stats from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reviews
        const reviewsResponse = await axios.get('http://localhost:5000/api/reviews');
        const approvedReviews = reviewsResponse.data
          .filter(review => review.isApproved)
          .slice(0, 5);
        setReviews(approvedReviews);

        // Fetch about data for stats
        const aboutResponse = await axios.get('http://localhost:5000/api/about');
        const aboutData = aboutResponse.data;
        
        // Set stats from about data
        setStats({
          vehicles: aboutData.stats?.carsDetailed || 0,
          satisfaction: aboutData.stats?.customerSatisfaction || 0,
          workingHours: aboutData.stats?.workingHours || 0
        });

      } catch (error) {
        console.error('Error fetching data:', error);
        // No fallback data
        setReviews([]);
        setStats({
          vehicles: 0,
          satisfaction: 0,
          workingHours: 0
        });
      }
    };

    fetchData();
  }, []);

  // Auto-rotate reviews
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change review every 4 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Number counting animation
  const animateNumbers = () => {
    if (hasAnimated) return;
    
    setHasAnimated(true);
    const duration = 2000;
    const steps = 60;

    let startTime = null;
    const finalValues = {
      vehicles: stats.vehicles,
      satisfaction: stats.satisfaction,
      workingHours: stats.workingHours
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const vehiclesValue = Math.floor(finalValues.vehicles * progress);
      const satisfactionValue = Math.floor(finalValues.satisfaction * progress);
      const workingHoursValue = Math.floor(finalValues.workingHours * progress);

      setStats({
        vehicles: vehiclesValue,
        satisfaction: satisfactionValue,
        workingHours: workingHoursValue
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final values are set exactly
        setStats(finalValues);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Text animations
    const animateText = (setText, fullText, delay, speed = 100) => {
      setTimeout(() => {
        let currentIndex = 0;
        const timer = setInterval(() => {
          if (currentIndex <= fullText.length) {
            setText(fullText.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(timer);
          }
        }, speed);
      }, delay);
    };

    animateText(setDisplayText1, fullText1, 1000, 80);
    animateText(setDisplayText2, fullText2, 2500, 70);
    animateText(setDisplayText3, fullText3, 5000, 60);
    animateText(setDisplayText4, fullText4, 7000, 60);
    animateText(setDisplayText5, fullText5, 9000, 50);

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
          if (entry.target.classList.contains('stats-section')) {
            animateNumbers();
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .float-up, .stats-section').forEach(el => {
      observer.observe(el);
    });

    // Also observe the stats section specifically
    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    // Add scroll progress indicator
    const handleScroll = () => {
      const scrollProgress = document.querySelector('.scroll-progress');
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasAnimated, stats.vehicles, stats.satisfaction, stats.workingHours]);

  // Star Rating Component
  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'star filled' : 'star'}>
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="home-page">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress"></div>

      {/* Enhanced Background Video with Gradient Overlay */}
      <div className="video-background">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="enhanced-video"
        >
          <source src="https://www.pexels.com/download/video/6158064/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-gradient-overlay"></div>
        <div className="video-noise"></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title fade-in" data-aos="fade-up">
            <span className="hero-gradient-text animated-text">
              {displayText1}<span className="cursor">|</span>
            </span>
            <span className="hero-accent-text color-changing-text animated-text">
              {displayText2}<span className="cursor">|</span>
            </span>
          </h1>
          <p className="hero-subtitle fade-in" data-aos="fade-up" data-aos-delay="200">
            Experience automotive perfection with our premium detailing services. 
            Where precision meets passion, and your car meets its true potential.
          </p>
          <div className="hero-buttons fade-in" data-aos="fade-up" data-aos-delay="400">
            <Link to="/services" className="btn btn-glow">
              <span className="btn-gradient">Explore Services</span>
            </Link>
            <Link to="/contact" className="btn btn-glass">
              <span>Book Now</span>
            </Link>
          </div>
          
          {/* Scroll Indicator */}
          <div className="scroll-indicator fade-in">
            <div className="scroll-arrow"></div>
            <span>Scroll to Explore</span>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section content-overlay">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text animated-title" data-aos="fade-up">
              {displayText3}<span className="cursor">|</span>
            </h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
              We combine cutting-edge technology with artisanal craftsmanship for unparalleled results
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card glass-card float-up" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg"></div>
                <div className="feature-icon">
                  <i className="fas fa-gem"></i>
                </div>
              </div>
              <h3>Premium Quality</h3>
              <p>Using only the finest products and techniques for unmatched, showroom-quality results</p>
              <div className="feature-gradient-border"></div>
            </div>
            
            <div className="feature-card glass-card float-up" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg"></div>
                <div className="feature-icon">
                  <i className="fas fa-bolt"></i>
                </div>
              </div>
              <h3>Express Service</h3>
              <p>Efficient detailing without compromising on quality and attention to detail</p>
              <div className="feature-gradient-border"></div>
            </div>
            
            <div className="feature-card glass-card float-up" data-aos="fade-up" data-aos-delay="500">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg"></div>
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
              </div>
              <h3>Long-Lasting Protection</h3>
              <p>Advanced protective coatings that keep your car looking pristine for longer</p>
              <div className="feature-gradient-border"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section services-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text animated-title" data-aos="fade-up">
              {displayText4}<span className="cursor">|</span>
            </h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
              Comprehensive detailing solutions tailored to your vehicle's needs
            </p>
          </div>
          
          <div className="services-grid">
            <div className="service-card glass-card slide-in-left" data-aos="fade-right">
              <div className="service-image">
                <div className="image-glow"></div>
                <img 
                  src="https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000" 
                  alt="Exterior Detailing"
                  className="service-real-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder">
                  <i className="fas fa-car"></i>
                </div>
                <div className="service-overlay">
                  <span>Exterior Excellence</span>
                </div>
              </div>
              <div className="service-content">
                <div className="service-badge">Most Popular</div>
                <h3>Exterior Detailing</h3>
                <p>Complete exterior transformation with advanced paint correction and protection</p>
                <ul>
                  <li><i className="fas fa-sparkles"></i> Paint Correction & Polish</li>
                  <li><i className="fas fa-gem"></i> Ceramic Coating</li>
                  <li><i className="fas fa-lightbulb"></i> Headlight Restoration</li>
                  <li><i className="fas fa-shield-alt"></i> Long-term Protection</li>
                </ul>
                <Link to="/services" className="btn btn-gradient">
                  <span>Discover More</span>
                </Link>
              </div>
            </div>
            
            <div className="service-card glass-card slide-in-right" data-aos="fade-left">
              <div className="service-content">
                <div className="service-badge">Premium Interior</div>
                <h3>Interior Detailing</h3>
                <p>Deep cleaning and rejuvenation for a like-new interior experience</p>
                <ul>
                  <li><i className="fas fa-couch"></i> Leather Treatment & Conditioning</li>
                  <li><i className="fas fa-tshirt"></i> Fabric Protection</li>
                  <li><i className="fas fa-wind"></i> Odor Elimination</li>
                  <li><i className="fas fa-sun"></i> UV Protection</li>
                </ul>
                <Link to="/services" className="btn btn-gradient">
                  <span>Discover More</span>
                </Link>
              </div>
              <div className="service-image">
                <div className="image-glow"></div>
                <img 
                  src="https://images.unsplash.com/photo-1708063785687-53f175935774?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" 
                  alt="Interior Detailing"
                  className="service-real-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder">
                  <i className="fas fa-chair"></i>
                </div>
                <div className="service-overlay">
                  <span>Interior Luxury</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="section recent-reviews">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gradient-text" data-aos="fade-up">
              What Our Customers Say
            </h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
              Real experiences from satisfied car owners
            </p>
          </div>

          <div className="reviews-carousel-container" data-aos="fade-up">
            <div className="reviews-carousel">
              {reviews.length > 0 ? (
                <div className="review-track">
                  {reviews.map((review, index) => (
                    <div
                      key={review._id}
                      className={`review-card-transparent ${
                        index === currentReviewIndex ? 'active' : ''
                      }`}
                    >
                      <div className="review-header">
                        <div className="reviewer-info">
                          <h4>{review.name}</h4>
                          <p>{review.vehicle}</p>
                        </div>
                        <div className="review-rating">
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <div className="review-content">
                        <p>"{review.comment}"</p>
                      </div>
                      <div className="review-date">
                        {new Date(review.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-reviews">
                  <div className="no-reviews-icon">⭐</div>
                  <h3>No Reviews Yet</h3>
                  <p>Be the first to share your experience!</p>
                </div>
              )}
            </div>

            {/* Review Navigation Dots */}
            {reviews.length > 1 && (
              <div className="review-dots">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    className={`review-dot ${index === currentReviewIndex ? 'active' : ''}`}
                    onClick={() => setCurrentReviewIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="reviews-cta" data-aos="fade-up" data-aos-delay="400">
            <Link to="/reviews" className="btn btn-outline">
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section" ref={statsSectionRef}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item zoom-in" data-aos="zoom-in">
              <div className="stat-number gradient-text">
                {stats.vehicles.toLocaleString()}+
              </div>
              <div className="stat-label">Vehicles Detailed</div>
            </div>
            <div className="stat-item zoom-in" data-aos="zoom-in" data-aos-delay="100">
              <div className="stat-number gradient-text">
                {stats.satisfaction}%
              </div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
            <div className="stat-item zoom-in" data-aos="zoom-in" data-aos-delay="200">
              <div className="stat-number gradient-text">
                {stats.workingHours.toLocaleString()}+
              </div>
              <div className="stat-label">Working Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="cta-section">
        <div className="cta-gradient-bg"></div>
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <div className="cta-badge">Limited Time Offer</div>
            <h2 className="animated-title">
              {displayText5}<span className="cursor">|</span>
            </h2>
            <p>Book your premium detailing session today and experience automotive perfection</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-glow btn-large">
                <span className="btn-gradient">Book Appointment</span>
              </Link>
              <Link to="/gallery" className="btn btn-glass btn-large">
                <span>View Our Work</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
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

export default HomePage;