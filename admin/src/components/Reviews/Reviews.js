import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5000/api/reviews/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId, approve) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `http://localhost:5000/api/reviews/${reviewId}/approve`,
        { approve },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleFeature = async (reviewId, featured) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `http://localhost:5000/api/reviews/${reviewId}/feature`,
        { featured },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReviews();
    } catch (error) {
      console.error('Error featuring review:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchReviews();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const StarRating = ({ rating }) => (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'star filled' : 'star'}>
          ⭐
        </span>
      ))}
    </div>
  );

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'approved') return review.isApproved;
    if (filter === 'pending') return !review.isApproved;
    if (filter === 'featured') return review.featured;
    return true;
  });

  return (
    <div className="reviews">
      <div className="page-header">
        <h1>Reviews Management</h1>
        <p>Manage customer reviews and testimonials</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Filter Reviews:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Reviews</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
            <option value="featured">Featured</option>
          </select>
        </div>
        <div className="stats">
          Showing: <strong>{filteredReviews.length}</strong> reviews
        </div>
      </div>

      {loading ? (
        <div className="loading">Fetching reviews, please wait...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No reviews found</h3>
          <p>Try adjusting your filter or come back later.</p>
        </div>
      ) : (
        <div className="reviews-grid">
          {filteredReviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <h4>{review.name}</h4>
                  <p>{review.vehicle}</p>
                </div>
                <div className="review-meta">
                  <StarRating rating={review.rating} />
                  <span className="review-date">{formatDate(review.createdAt)}</span>
                </div>
              </div>

              <div className="review-content">
                <p>{review.comment}</p>
              </div>

              <div className="review-status">
                <div className="status-badges">
                  {!review.isApproved && (
                    <span className="status-badge status-pending">Pending</span>
                  )}
                  {review.featured && (
                    <span className="status-badge status-featured">Featured</span>
                  )}
                </div>

                <div className="review-actions">
                  {!review.isApproved ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleApprove(review._id, true)}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleApprove(review._id, false)}
                    >
                      Unapprove
                    </button>
                  )}

                  {review.isApproved && (
                    <button
                      className={`btn btn-sm ${review.featured ? 'btn-secondary' : 'btn-success'}`}
                      onClick={() => handleFeature(review._id, !review.featured)}
                    >
                      {review.featured ? 'Unfeature' : 'Feature'}
                    </button>
                  )}

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
