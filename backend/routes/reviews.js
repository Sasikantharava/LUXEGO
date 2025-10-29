const express = require('express');
const {
  getReviews,
  createReview,
  getAdminReviews,
  approveReview,
  featureReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);
router.get('/admin', protect, admin, getAdminReviews);
router.put('/:id/approve', protect, admin, approveReview);
router.put('/:id/feature', protect, admin, featureReview);
router.delete('/:id', protect, admin, deleteReview);

module.exports = router;