const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  popular: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['exterior', 'interior', 'ceramic', 'premium'],
    default: 'exterior'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);