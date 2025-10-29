const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['exterior', 'interior', 'ceramic'],
    required: true
  },
  imageUrl: {
    type: [String], // ✅ allows multiple URLs
    required: true
  },
  imageType: {
    type: String,
    enum: ['upload', 'url'],
    required: true
  },
  fileName: {
    type: String,
    default: ''
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
