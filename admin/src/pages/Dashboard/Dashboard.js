import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  FaClipboardList,
  FaHourglassHalf,
  FaWrench,
  FaRupeeSign,
} from 'react-icons/fa';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    inProgressBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    monthlyStats: []
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [statsResponse, bookingsResponse] = await Promise.all([
        axios.get('https://luxego.onrender.com/api/bookings/stats/dashboard', config),
        axios.get('https://luxego.onrender.com/api/bookings', config),
      ]);

      setStats(statsResponse.data);
      setRecentBookings(bookingsResponse.data.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const revenueChartData = {
    labels: stats.monthlyStats.map(stat => `Month ${stat._id.month}`),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: stats.monthlyStats.map(stat => stat.revenue),
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const bookingsChartData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [stats.pendingBookings, stats.inProgressBookings, stats.completedBookings],
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',
          'rgba(37, 99, 235, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(245, 158, 11, 1)',
          'rgba(37, 99, 235, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to EliteAuto Care Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total"><FaClipboardList /></div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending"><FaHourglassHalf /></div>
          <div className="stat-info">
            <h3>{stats.pendingBookings}</h3>
            <p>Pending Bookings</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress"><FaWrench /></div>
          <div className="stat-info">
            <h3>{stats.inProgressBookings}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue"><FaRupeeSign /></div>
          <div className="stat-info">
            <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Monthly Revenue</h3>
          <div className="chart-container">
            <Bar data={revenueChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Bookings Distribution</h3>
          <div className="chart-container">
            <Doughnut data={bookingsChartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="recent-bookings">
        <div className="card">
          <h3>Recent Bookings</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.contact?.name}</td>
                    <td>{booking.serviceType}</td>
                    <td>{new Date(booking.scheduledDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge status-${booking.workStatus}`}>
                        {booking.workStatus}
                      </span>
                    </td>
                    <td>₹{booking.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
