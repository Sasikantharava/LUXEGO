const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  addonService: {
    type: String,
    default: ''
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true
  },
  estimatedDuration: {
    type: String,
    required: true
  },
  assignedStaff: {
    type: String,
    trim: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  advancePaid: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid'],
    default: 'pending'
  },
  workStatus: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  completionNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);