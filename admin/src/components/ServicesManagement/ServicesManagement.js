import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServicesManagement.css';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    duration: '',
    features: [''],
    popular: false,
    description: '',
    category: 'exterior',
    displayOrder: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5000/api/services/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const submitData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'features') submitData.append(key, value);
      });

      formData.features.forEach(feature => {
        if (feature.trim() !== '') submitData.append('features', feature);
      });

      if (imageFile) submitData.append('image', imageFile);

      if (editingService) {
        await axios.put(`http://localhost:5000/api/services/${editingService._id}`, submitData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        setMessage('✅ Service updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/services', submitData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        setMessage('✅ Service created successfully!');
      }

      resetForm();
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      setMessage('❌ ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      duration: '',
      features: [''],
      popular: false,
      description: '',
      category: 'exterior',
      displayOrder: 0
    });
    setImageFile(null);
    setEditingService(null);
    setShowForm(false);
    setMessage('');
  };

  const editService = (service) => {
    setFormData({
      title: service.title,
      price: service.price,
      duration: service.duration,
      features: service.features.length > 0 ? service.features : [''],
      popular: service.popular,
      description: service.description || '',
      category: service.category || 'exterior',
      displayOrder: service.displayOrder || 0
    });
    setEditingService(service);
    setShowForm(true);
  };

  const deleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/services/${serviceId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('🗑️ Service deleted successfully!');
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        setMessage('❌ ' + (error.response?.data?.message || error.message));
      }
    }
  };

  if (loading) return <div className="loading">Loading services...</div>;

  return (
    <div className="services-management">
      <div className="page-header">
        <h1>Services Management</h1>
        <p>Manage and organize all your service offerings with ease</p>
        <button className="btn primary" onClick={() => setShowForm(true)}>
          <FaPlus /> Add New Service
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="form-modal">
          <div className="modal-content">
            <div className="modal-header1">
              <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
              <button className="close-btn" onClick={resetForm}><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit} className="service-form">
              <div className="form-grid">
                {/* Basic Info */}
                <div className="form-group">
                  <label>Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Price *</label>
                  <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="₹1,999" required />
                </div>
                <div className="form-group">
                  <label>Duration *</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="2-3 hours" required />
                </div>

                {/* Category + Popular */}
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="exterior">Exterior</option>
                    <option value="interior">Interior</option>
                    <option value="ceramic">Ceramic Coating</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input type="checkbox" name="popular" checked={formData.popular} onChange={handleInputChange} />
                    Mark as Popular
                  </label>
                </div>

                {/* Image Upload */}
                <div className="form-group full-width">
                  <label>Service Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                  {editingService?.image && (
                    <div className="current-image">
                      <img src={`http://localhost:5000${editingService.image}`} alt="Current" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
                </div>

                {/* Features */}
                <div className="form-group full-width">
                  <label>Features *</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="feature-input">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Feature"
                        required
                      />
                      {formData.features.length > 1 && (
                        <button type="button" className="btn small danger" onClick={() => removeFeature(index)}>
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="btn small secondary" onClick={addFeature}>
                    + Add Feature
                  </button>
                </div>
              </div>

              <div className="form-actions2">
                <button type="button" className="btn secondary" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn primary" disabled={saving}>
                  {saving ? 'Saving...' : editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="services-grid">
        {services.map(service => (
          <div key={service._id} className="service-card">
            {service.image && (
              <div className="service-image">
                <img src={`http://localhost:5000${service.image}`} alt={service.title} />
              </div>
            )}
            <div className="service-content">
              <div className="service-header">
                <h3>{service.title}</h3>
                {service.popular && <span className="badge">★ Popular</span>}
              </div>
              <p className="price">{service.price}</p>
              <p className="duration">{service.duration}</p>
              <span className="category-tag">{service.category}</span>
              <ul className="features">
                {service.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div className="actions">
                <button className="btn small secondary" onClick={() => editService(service)}><FaEdit /> Edit</button>
                <button className="btn small danger" onClick={() => deleteService(service._id)}><FaTrashAlt /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="no-services">
          <p>No services yet — start by adding one!</p>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;
