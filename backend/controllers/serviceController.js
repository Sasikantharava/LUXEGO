const Service = require('../models/Service');
const path = require('path');
const fs = require('fs');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all services for admin
// @route   GET /api/services/admin
// @access  Private/Admin
const getAdminServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ displayOrder: 1 });
    res.json(services);
  } catch (error) {
    console.error('Get admin services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
  try {
    let imagePath = '';
    
    if (req.file) {
      imagePath = `/uploads/services/${req.file.filename}`;
    }

    // Handle features array
    let features = [];
    if (Array.isArray(req.body.features)) {
      features = req.body.features;
    } else if (typeof req.body.features === 'string') {
      features = [req.body.features];
    } else if (req.body.features) {
      // If it's coming as multiple fields with same name
      features = Object.values(req.body).filter(val => 
        typeof val === 'string' && val.startsWith && !val.startsWith('/uploads/')
      );
    }

    const serviceData = {
      title: req.body.title,
      price: req.body.price,
      duration: req.body.duration,
      features: features.filter(f => f.trim() !== ''),
      popular: req.body.popular === 'true' || req.body.popular === true,
      description: req.body.description,
      category: req.body.category || 'exterior',
      displayOrder: parseInt(req.body.displayOrder) || 0,
      image: imagePath
    };

    const service = await Service.create(serviceData);
    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    let updateData = { ...req.body };
    let imagePath = service.image;

    if (req.file) {
      // Delete old image if exists
      if (service.image) {
        const oldFilePath = path.join(__dirname, '..', service.image);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      imagePath = `/uploads/services/${req.file.filename}`;
    }

    // Handle features array
    let features = [];
    if (Array.isArray(req.body.features)) {
      features = req.body.features;
    } else if (typeof req.body.features === 'string') {
      features = [req.body.features];
    } else if (req.body.features) {
      features = Object.values(req.body).filter(val => 
        typeof val === 'string' && val.startsWith && !val.startsWith('/uploads/')
      );
    }

    updateData.features = features.filter(f => f.trim() !== '');
    updateData.popular = req.body.popular === 'true' || req.body.popular === true;
    updateData.displayOrder = parseInt(req.body.displayOrder) || 0;
    updateData.image = imagePath;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedService);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Delete image file if exists
    if (service.image) {
      const filePath = path.join(__dirname, '..', service.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getServices,
  getAdminServices,
  createService,
  updateService,
  deleteService,
};