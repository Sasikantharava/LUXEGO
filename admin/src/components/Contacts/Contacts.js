import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('https://luxego.onrender.com/api/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `https://luxego.onrender.com/api/contact/${contactId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`https://luxego.onrender.com/api/contact/${contactId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredContacts =
    statusFilter === 'all'
      ? contacts
      : contacts.filter((c) => c.status === statusFilter);

  const getStatusBadge = (status) => `status-${status}`;

  // Calculate total amount for display
  const calculateTotalAmount = (contact) => {
    const servicePrices = {
      'Exterior Detailing - £45': 45,
      'Interior Detailing - £55': 55,
      'Full Car Detailing - £95': 95,
    };
    
    const addonPrices = {
      'Ceramic Coating - £75': 75,
      'Paint Correction - £120': 120,
      'Leather Conditioning - £25': 25,
      'Headlight Restoration - £35': 35,
      'Engine Bay Cleaning - £30': 30,
      'Odor Elimination - £40': 40,
      '': 0
    };
    
    const serviceAmount = servicePrices[contact.service] || 0;
    const addonAmount = addonPrices[contact.addon] || 0;
    
    return serviceAmount + addonAmount;
  };

  if (loading) {
    return (
      <div className="contacts">
        <div className="loading">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="contacts">
      <div className="page-header">
        <h1>Contacts Management</h1>
        <p>View, manage, and update all customer inquiries</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Status Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="stats">
          Showing <strong>{filteredContacts.length}</strong> of{' '}
          {contacts.length} contacts
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact Info</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Addon</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id}>
                  <td>
                    <div className="customer-info">
                      <strong>{contact.name}</strong>
                      <span>{contact.email}</span>
                    </div>
                  </td>
                  <td className="contact-info">
                    <div>
                      <strong>📞 {contact.phone}</strong>
                      <div className="address-info">{contact.address}</div>
                    </div>
                  </td>
                  <td>
                    <div className="vehicle-info">
                      <strong>{contact.vehicleModel}</strong>
                    </div>
                  </td>
                  <td className="service-type">
                    <strong>{contact.service}</strong>
                  </td>
                  <td className="addon-service">
                    {contact.addon || 'None'}
                  </td>
                  <td>
                    <div className="datetime-info">
                      <strong>{formatDate(contact.bookingDate)}</strong>
                      <span>{contact.bookingTime}</span>
                    </div>
                  </td>
                  <td className="amount">
                    <strong>£{calculateTotalAmount(contact)}</strong>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${getStatusBadge(contact.status)}`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="submitted-date">{formatDate(contact.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleViewDetails(contact)}
                      >
                        View
                      </button>
                      <select
                        value={contact.status}
                        onChange={(e) =>
                          handleStatusUpdate(contact._id, e.target.value)
                        }
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteContact(contact._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredContacts.length === 0 && (
            <div className="no-data">No contacts found for this status</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedContact && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Full Name:</label>
                  <span>{selectedContact.name}</span>
                </div>
                <div className="detail-item">
                  <label>Phone Number:</label>
                  <span>{selectedContact.phone}</span>
                </div>
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{selectedContact.email}</span>
                </div>
                <div className="detail-item full-width">
                  <label>Address:</label>
                  <span>{selectedContact.address}</span>
                </div>
                <div className="detail-item">
                  <label>Vehicle Model:</label>
                  <span>{selectedContact.vehicleModel}</span>
                </div>
                <div className="detail-item">
                  <label>Main Service:</label>
                  <span className="service-highlight">{selectedContact.service}</span>
                </div>
                <div className="detail-item">
                  <label>Addon Service:</label>
                  <span>{selectedContact.addon || 'None'}</span>
                </div>
                <div className="detail-item">
                  <label>Total Amount:</label>
                  <span className="amount-highlight">£{calculateTotalAmount(selectedContact)}</span>
                </div>
                <div className="detail-item">
                  <label>Preferred Date:</label>
                  <span>{formatDate(selectedContact.bookingDate)}</span>
                </div>
                <div className="detail-item">
                  <label>Preferred Time:</label>
                  <span>{selectedContact.bookingTime}</span>
                </div>
                <div className="detail-item full-width">
                  <label>Customer Requirements:</label>
                  <div className="requirements-box">
                    {selectedContact.requirements ||
                      'No specific requirements provided'}
                  </div>
                </div>
                <div className="detail-item">
                  <label>Status:</label>
                  <span
                    className={`status-badge ${getStatusBadge(selectedContact.status)}`}
                  >
                    {selectedContact.status}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Submitted On:</label>
                  <span>{formatDate(selectedContact.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    // Add functionality to contact customer
                    window.open(`mailto:${selectedContact.email}?subject=Regarding your car detailing booking&body=Dear ${selectedContact.name},`, '_blank');
                  }}
                >
                  Email Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;