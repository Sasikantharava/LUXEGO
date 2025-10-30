// backend/scripts/createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'MONGODB_URI=mongodb+srv://sasikanth56789:mern123@cluster0.8u70rcx.mongodb.net/?appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ username: 'admin' });

    if (!adminExists) {
      await User.create({
        username: 'admin',        // required
        password: 'admin123',     // will be hashed automatically
        role: 'superadmin',
      });

      console.log('✅ Admin user created successfully!');
      console.log('Username: admin');
      console.log('Password: admin123');
    } else {
      console.log('Admin user already exists');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
