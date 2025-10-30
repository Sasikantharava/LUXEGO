import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutManagement.css';

const AboutManagement = () => {
  const [aboutData, setAboutData] = useState({
    companyName: '',
    description: '',
    mission: '',
    vision: '',
    values: [],
    team: [],
    contactInfo: {
      phone: '',
      email: '',
      address: '',
      workingHours: ''
    },
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: ''
    },
    stats: {
      workingHours: 0,
      carsDetailed: 0,
      customerSatisfaction: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get('https://luxego.onrender.com/api/about');
      const data = response.data;
      setAboutData(prev => ({
        ...prev,
        ...data,
        stats: data.stats || {
          workingHours: 0,
          carsDetailed: 0,
          customerSatisfaction: 0
        }
      }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching about data:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setAboutData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleStatsChange = (field, value) => {
    setAboutData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: parseInt(value) || 0
      }
    }));
  };

  const handleValueChange = (index, field, value) => {
    const newValues = [...aboutData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setAboutData(prev => ({ ...prev, values: newValues }));
  };

  const handleTeamChange = (index, field, value) => {
    const newTeam = [...aboutData.team];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setAboutData(prev => ({ ...prev, team: newTeam }));
  };

  const addValue = () => {
    setAboutData(prev => ({
      ...prev,
      values: [...prev.values, { title: '', description: '' }]
    }));
  };

  const removeValue = (index) => {
    setAboutData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const addTeamMember = () => {
    setAboutData(prev => ({
      ...prev,
      team: [...prev.team, { name: '', role: '', description: '' }]
    }));
  };

  const removeTeamMember = (index) => {
    setAboutData(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put('https://luxego.onrender.com/api/about', aboutData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ About page updated successfully!');
    } catch (error) {
      console.error('Error updating about data:', error);
      setMessage('❌ Error updating about page. Please try again.');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="about-management">
        <div className="loading">Loading about data...</div>
      </div>
    );
  }

  return (
    <div className="about-management">
      <div className="page-header">
        <h1>About Page Management</h1>
        <p>Customize and maintain your company's About section</p>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {['stats', 'basic', 'mission', 'values', 'team', 'contact'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'stats' && '📊 Statistics'}
            {tab === 'basic' && '🏢 Basic Info'}
            {tab === 'mission' && '🎯 Mission & Vision'}
            {tab === 'values' && '💎 Values'}
            {tab === 'team' && '👥 Team'}
            {tab === 'contact' && '☎️ Contact'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="about-form">
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {/* Conditional Rendering for Tabs */}
        {activeTab === 'stats' && (
          <div className="form-section">
            <h3>Company Statistics</h3>
            <div className="form-grid">
              {['workingHours', 'carsDetailed', 'customerSatisfaction'].map((field, i) => (
                <div className="form-group" key={i}>
                  <label>{field === 'workingHours'
                    ? 'Working Hours'
                    : field === 'carsDetailed'
                    ? 'Cars Detailed'
                    : 'Customer Satisfaction (%)'}
                  </label>
                  <input
                    type="number"
                    value={aboutData.stats[field]}
                    onChange={(e) => handleStatsChange(field, e.target.value)}
                    min="0"
                    max="100000"
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'basic' && (
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={aboutData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={aboutData.description}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mission' && (
          <div className="form-section">
            <h3>Mission & Vision</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Mission</label>
                <textarea
                  name="mission"
                  value={aboutData.mission}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Vision</label>
                <textarea
                  name="vision"
                  value={aboutData.vision}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="form-section">
            <div className="section-header">
              <h3>Company Values</h3>
              <button type="button" className="btn-outline" onClick={addValue}>+ Add Value</button>
            </div>
            {aboutData.values.map((value, index) => (
              <div key={index} className="item-card">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={value.description}
                      onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                      rows="2"
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger" onClick={() => removeValue(index)}>Remove</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="form-section">
            <div className="section-header">
              <h3>Team Members</h3>
              <button type="button" className="btn-outline" onClick={addTeamMember}>+ Add Member</button>
            </div>
            {aboutData.team.map((member, index) => (
              <div key={index} className="item-card">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={member.description}
                      onChange={(e) => handleTeamChange(index, 'description', e.target.value)}
                      rows="2"
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger" onClick={() => removeTeamMember(index)}>Remove</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="form-section">
            <h3>Contact Info</h3>
            <div className="form-grid">
              {['phone', 'email', 'address', 'workingHours'].map((field, i) => (
                <div className={`form-group ${field === 'address' || field === 'workingHours' ? 'full-width' : ''}`} key={i}>
                  <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={aboutData.contactInfo[field]}
                    onChange={(e) => handleNestedChange('contactInfo', field, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutManagement;