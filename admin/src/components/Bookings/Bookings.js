import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaEye,
  FaPlay,
  FaCheckCircle,
  FaUserAlt,
  FaCarAlt,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaClipboardList
} from 'react-icons/fa';
import './Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}`,
        { workStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN');

  const getStatusBadge = (status) => {
    const statusMap = {
      'scheduled': 'pending',
      'in-progress': 'progress',
      'completed': 'completed',
      'cancelled': 'cancelled'
    };
    return `status-${statusMap[status] || 'pending'}`;
  };

  if (loading) {
    return (
      <div className="bookings">
        <div className="loading">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="bookings">
      <div className="page-header">
        <h1><FaClipboardList /> Bookings Management</h1>
        <p>Manage all customer bookings and appointments</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    <div className="customer-info">
                      <strong>{booking.contact?.name}</strong>
                      <span>{booking.contact?.phone}</span>
                    </div>
                  </td>
                  <td>{booking.contact?.vehicleModel}</td>
                  <td className="service-type">{booking.serviceType}</td>
                  <td>
                    <div className="datetime-info">
                      <strong>{formatDate(booking.scheduledDate)}</strong>
                      <span>{booking.scheduledTime}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(booking.workStatus)}`}>
                      {booking.workStatus}
                    </span>
                  </td>
                  <td className="amount">₹{booking.totalAmount}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleViewDetails(booking)}
                      >
                        <FaEye /> View
                      </button>
                      {booking.workStatus === 'scheduled' && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleStatusUpdate(booking._id, 'in-progress')}
                        >
                          <FaPlay /> Start
                        </button>
                      )}
                      {booking.workStatus === 'in-progress' && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleStatusUpdate(booking._id, 'completed')}
                        >
                          <FaCheckCircle /> Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaEye /> Booking Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><label><FaUserAlt /> Customer Name:</label><span>{selectedBooking.contact?.name}</span></div>
                <div className="detail-item"><label>📞 Phone:</label><span>{selectedBooking.contact?.phone}</span></div>
                <div className="detail-item"><label><FaCarAlt /> Vehicle:</label><span>{selectedBooking.contact?.vehicleModel}</span></div>
                <div className="detail-item"><label>💺 Seat Type:</label><span>{selectedBooking.contact?.seatType}</span></div>
                <div className="detail-item"><label>🧰 Service:</label><span>{selectedBooking.serviceType}</span></div>
                <div className="detail-item"><label><FaCalendarAlt /> Date:</label><span>{formatDate(selectedBooking.scheduledDate)}</span></div>
                <div className="detail-item"><label><FaClock /> Time:</label><span>{selectedBooking.scheduledTime}</span></div>
                <div className="detail-item"><label><FaMoneyBillWave /> Amount:</label><span className="amount">₹{selectedBooking.totalAmount}</span></div>
                <div className="detail-item full-width">
                  <label>📝 Requirements:</label>
                  <p>{selectedBooking.contact?.requirements || 'No specific requirements'}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;