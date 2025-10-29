const Contact = require('../models/Contact');
const Booking = require('../models/Booking');

// @desc    Create new contact/booking
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // Create a booking from the contact
    const booking = await Booking.create({
      contact: contact._id,
      serviceType: contact.service,
      scheduledDate: contact.bookingDate,
      scheduledTime: contact.bookingTime,
      estimatedDuration: '2-4 hours', // Default estimate
      totalAmount: calculateAmount(contact.service, contact.addon),
    });

    res.status(201).json({
      message: 'Booking request submitted successfully',
      contact,
      bookingId: booking._id
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Also delete associated booking
    await Booking.findOneAndDelete({ contact: contact._id });
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to calculate amount based on service and addon
const calculateAmount = (service, addon) => {
  const servicePrices = {
    'Exterior Detailing - £45': 45,
    'Interior Detailing - £55': 55,
    'Full Car Detailing - £95': 95,
  };
  
  const addonPrices = {
    'Ceramic Coating - £75': 75,
    'Paint Correction - £120': 120,
    'Leather Conditioning - £25': 25,
    'Headlight Restoration - £35': 35,
    'Engine Bay Cleaning - £30': 30,
    'Odor Elimination - £40': 40,
    '': 0
  };
  
  const serviceAmount = servicePrices[service] || 0;
  const addonAmount = addonPrices[addon] || 0;
  
  return serviceAmount + addonAmount;
};

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};