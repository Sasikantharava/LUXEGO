const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get gallery by category
// @route   GET /api/gallery/category/:category
// @access  Public
const getGalleryByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const gallery = await Gallery.find({ category }).sort({ displayOrder: 1, createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    console.error('Get gallery by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new gallery item
// @route   POST /api/gallery
// @access  Private/Admin
const createGalleryItem = async (req, res) => {
  try {
    let imageUrl = [];
    let imageType = 'url';
    let fileName = '';

    if (req.file) {
      // File upload (single)
      imageUrl = [`/uploads/gallery/${req.file.filename}`];
      imageType = 'upload';
      fileName = req.file.originalname;
    } else if (req.body.imageUrl) {
      // URL(s)
      if (Array.isArray(req.body.imageUrl)) {
        imageUrl = req.body.imageUrl;
      } else {
        imageUrl = [req.body.imageUrl];
      }
      imageType = 'url';
    } else {
      return res.status(400).json({ message: 'Either image file or image URL is required' });
    }

    const galleryData = {
      ...req.body,
      imageUrl,
      imageType,
      fileName
    };

    const galleryItem = await Gallery.create(galleryData);
    res.status(201).json(galleryItem);
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
const updateGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    let updateData = { ...req.body };

    if (req.file) {
      // Delete old file if it was an upload
      if (galleryItem.imageType === 'upload' && galleryItem.imageUrl?.length) {
        const oldFilePath = path.join(__dirname, '..', galleryItem.imageUrl[0]);
        if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
      }

      updateData.imageUrl = [`/uploads/gallery/${req.file.filename}`];
      updateData.imageType = 'upload';
      updateData.fileName = req.file.originalname;
    } else if (req.body.imageUrl) {
      // If updating image URLs
      if (Array.isArray(req.body.imageUrl)) {
        updateData.imageUrl = req.body.imageUrl;
      } else {
        updateData.imageUrl = [req.body.imageUrl];
      }
      updateData.imageType = 'url';
      updateData.fileName = '';
    }

    const updatedGalleryItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedGalleryItem);
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Delete file if it was an upload
    if (galleryItem.imageType === 'upload' && galleryItem.imageUrl?.length) {
      const filePath = path.join(__dirname, '..', galleryItem.imageUrl[0]);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getGallery,
  getGalleryByCategory,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
