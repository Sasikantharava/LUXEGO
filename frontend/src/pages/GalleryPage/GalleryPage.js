import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GalleryPage.css';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Projects', emoji: '🌟' },
    { id: 'exterior', name: 'Exterior', emoji: '🚗' },
    { id: 'interior', name: 'Interior', emoji: '💺' },
    { id: 'ceramic', name: 'Ceramic Coating', emoji: '💎' }
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gallery');
      setGalleryItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setLoading(false);
    }
  };

  const filteredImages = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(image => image.category === activeCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getEmojiForCategory = (category) => {
    const categoryMap = {
      'exterior': '🚗',
      'interior': '💺',
      'ceramic': '💎'
    };
    return categoryMap[category] || '📷';
  };

  if (loading) {
    return (
      <div className="gallery-page">
        <div className="loading">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="https://www.pexels.com/download/video/30678639/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <section className="gallery-hero section">
        <div className="container">
          <div className="hero-content-centered" data-aos="fade-up">
            <h1>Our Work Gallery</h1>
            <p className="lead">
              Witness the transformation - Browse through our portfolio of detailing excellence
            </p>
          </div>
        </div>
      </section>

      <section className="gallery-section section">
        <div className="container">
          <div className="gallery-filters-centered" data-aos="fade-up">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="filter-emoji">{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="gallery-grid-centered">
            {filteredImages.map((image, index) => (
              <div 
                key={image._id}
                className="gallery-item"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                onClick={() => openModal(image)}
              >
                <div className="image-container">
                  {image.imageUrl ? (
                    <img 
                      src={image.imageType === 'upload' ? `http://localhost:5000${image.imageUrl}` : image.imageUrl}
                      alt={image.title}
                      className="gallery-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="image-placeholder">
                    <span className="gallery-emoji">{getEmojiForCategory(image.category)}</span>
                    <div className="image-badge">{image.category}</div>
                  </div>
                </div>
                <div className="image-overlay">
                  <h4>{image.title}</h4>
                  <p>{image.description}</p>
                  <span className="view-btn">View Details</span>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="no-results" data-aos="fade-up">
              <div className="no-results-emoji">🔍</div>
              <h3>No projects found</h3>
              <p>Try selecting a different category to see more amazing work.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <div className="modal-image">
              {selectedImage.imageUrl ? (
                <img 
                  src={selectedImage.imageType === 'upload' ? `http://localhost:5000${selectedImage.imageUrl}` : selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="modal-real-image"
                />
              ) : (
                <div className="image-placeholder large">
                  <span className="modal-emoji">{getEmojiForCategory(selectedImage.category)}</span>
                </div>
              )}
            </div>
            <div className="modal-info">
              <div className="modal-header">
                <h3>{selectedImage.title}</h3>
                <span className="category-tag">{selectedImage.category}</span>
              </div>
              <p>{selectedImage.description}</p>
              <div className="modal-features">
                <div className="feature">
                  <span className="feature-emoji">⭐</span>
                  <span>Premium Quality</span>
                </div>
                <div className="feature">
                  <span className="feature-emoji">⚡</span>
                  <span>Expert Service</span>
                </div>
                <div className="feature">
                  <span className="feature-emoji">🎯</span>
                  <span>Precision Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;