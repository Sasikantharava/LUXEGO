const express = require('express');
const {
  getServices,
  getAdminServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Add this import

const router = express.Router();

router.get('/', getServices);
router.get('/admin', protect, admin, getAdminServices);
router.post('/', protect, admin, upload.single('image'), createService); // Add upload middleware
router.put('/:id', protect, admin, upload.single('image'), updateService); // Add upload middleware
router.delete('/:id', protect, admin, deleteService);

module.exports = router;