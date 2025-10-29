const express = require('express');
const {
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingStats,
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, admin, getBookings);
router.get('/stats/dashboard', protect, admin, getBookingStats);
router.get('/:id', protect, admin, getBookingById);
router.put('/:id', protect, admin, updateBooking);
router.delete('/:id', protect, admin, deleteBooking);

module.exports = router;