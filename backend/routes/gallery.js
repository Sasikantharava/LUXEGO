const express = require('express');
const {
  getGallery,
  getGalleryByCategory,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getGallery);
router.get('/category/:category', getGalleryByCategory);
router.post('/', protect, admin, upload.single('image'), createGalleryItem);
router.put('/:id', protect, admin, upload.single('image'), updateGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);

module.exports = router;