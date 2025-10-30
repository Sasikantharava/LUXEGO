const About = require('../models/About');

// @desc    Get about content
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      // Create default about content if none exists
      about = await About.create({
        companyName: 'LuxegoAuto Care',
        description: 'Premium car detailing services with over a decade of experience.',
        mission: 'To provide exceptional automotive detailing services that exceed customer expectations through innovative techniques, premium products, and unwavering commitment to quality.',
        vision: 'To become the most trusted name in automotive care.',
        values: [
          {
            title: 'Quality',
            description: 'We never compromise on quality and use only the best products.'
          },
          {
            title: 'Customer Satisfaction',
            description: 'Our customers happiness is our top priority.'
          }
        ],
        team: [
          {
            name: 'Rajesh Kumar',
            role: 'Founder & Master Detailer',
            description: '15+ years experience in automotive detailing'
          },
          {
            name: 'Priya Sharma',
            role: 'Interior Specialist',
            description: 'Expert in leather care, fabric protection, and interior rejuvenation'
          },
          {
            name: 'Arun Patel',
            role: 'Ceramic Coating Expert',
            description: 'Specialized in advanced paint protection and nano-ceramic coatings'
          }
        ],
        contactInfo: {
          phone: '+91 9876543210',
          email: 'info@luxegoautocare.com',
          address: '123 Auto Street, City, State 560001',
          workingHours: 'Mon-Sat: 9AM-6PM, Sun: 10AM-4PM'
        },
        socialLinks: {
          facebook: '#',
          instagram: '#',
          twitter: '#'
        },
        stats: {
          yearsExperience: 10,
          carsDetailed: 5000,
          customerSatisfaction: 98
        }
      });
    }

    res.json(about);
  } catch (error) {
    console.error('Get about error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update about content
// @route   PUT /api/about
// @access  Private/Admin
const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findOneAndUpdate(
        {},
        req.body,
        { new: true, runValidators: true }
      );
    }

    res.json(about);
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAbout,
  updateAbout,
};