import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewsPage.css';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalCustomers: 0,
    recommendationRate: 0
  });
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    vehicle: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://luxego.onrender.com/api/reviews');
      setReviews(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const calculateStats = (reviewsData) => {
    if (reviewsData.length === 0) {
      setStats({
        averageRating: 0,
        totalCustomers: 0,
        recommendationRate: 0
      });
      return;
    }

    // Calculate average rating
    const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviewsData.length;

    // Calculate total customers (using reviews count as proxy)
    const totalCustomers = reviewsData.length;

    // Calculate recommendation rate (assuming ratings 4-5 would recommend)
    const recommendedReviews = reviewsData.filter(review => review.rating >= 4).length;
    const recommendationRate = (recommendedReviews / reviewsData.length) * 100;

    setStats({
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalCustomers: totalCustomers,
      recommendationRate: Math.round(recommendationRate)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('https://luxego.onrender.com/api/reviews', newReview);
      setNewReview({ name: '', rating: 5, comment: '', vehicle: '' });
      fetchReviews(); // Refresh reviews and stats after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
    
    setIsSubmitting(false);
  };

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
    <div className="reviews-page">
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="https://www.pexels.com/download/video/33596417/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <section className="reviews-hero section">
        <div className="container">
          <div className="hero-content-centered" data-aos="fade-up">
            <h1>Customer Reviews</h1>
            <p className="lead">
              See what our satisfied customers have to say about our premium detailing services
            </p>
          </div>
        </div>
      </section>

      <section className="reviews-section section">
        <div className="container">
          <div className="reviews-container-centered">
            <div className="reviews-stats" data-aos="fade-right">
              <div className="stats-card">
                <h3>{stats.averageRating}/5</h3>
                <StarRating rating={stats.averageRating} />
                <p>Average Rating</p>
              </div>
              <div className="stats-card">
                <h3>{stats.totalCustomers}+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stats-card">
                <h3>{stats.recommendationRate}%</h3>
                <p>Would Recommend</p>
              </div>
            </div>

            <div className="add-review-form" data-aos="fade-left">
              <h3>Share Your Experience</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Vehicle Model"
                    value={newReview.vehicle}
                    onChange={(e) => setNewReview({...newReview, vehicle: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rating:</label>
                  <div className="rating-select">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <label key={rating} className="rating-option">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={newReview.rating === rating}
                          onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                        />
                        <span className="star">⭐</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Share your experience..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>

          <div className="reviews-grid-centered">
            {reviews.map((review, index) => (
              <div 
                key={review._id} 
                className="review-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="review-header">
                  <div className="reviewer-info">
                    <h4>{review.name}</h4>
                    <p>{review.vehicle}</p>
                  </div>
                  <div className="review-meta">
                    <StarRating rating={review.rating} />
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="review-content">
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Show message when no reviews */}
          {reviews.length === 0 && (
            <div className="no-reviews-message" >
              <h3>No reviews yet</h3>
              <p>Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;