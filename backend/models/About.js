const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  },
  values: [{
    title: String,
    description: String
  }],
  team: [{
    name: String,
    role: String,
    description: String,
    image: String
  }],
  contactInfo: {
    phone: String,
    email: String,
    address: String,
    workingHours: String
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String
  },
  stats: {
    workingHours: {
      type: Number,
      default: 0
    },
    carsDetailed: {
      type: Number,
      default: 0
    },
    customerSatisfaction: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);