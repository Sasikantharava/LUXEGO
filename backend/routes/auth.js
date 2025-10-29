const express = require('express');
const {
  loginAdmin,
  getAdminProfile,
  createAdminUser,
} = require('../controllers/authController');
const { protect, admin, superAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protect, admin, getAdminProfile);
router.post('/users', protect, superAdmin, createAdminUser);

module.exports = router;