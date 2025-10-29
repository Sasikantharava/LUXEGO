const express = require('express');
const {
  getAbout,
  updateAbout,
} = require('../controllers/aboutController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAbout);
router.put('/', protect, admin, updateAbout);

module.exports = router;