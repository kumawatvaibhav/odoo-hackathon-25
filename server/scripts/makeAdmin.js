import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Users from '../models/auth.js';

dotenv.config();

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const user = await Users.findOne({ email });
    
    if (!user) {
      console.log('User not found with email:', email);
      return;
    }

    user.role = 'admin';
    await user.save();

    console.log(`User ${user.name} (${email}) is now an admin!`);
    process.exit(0);
  } catch (error) {
    console.error('Error making user admin:', error);
    process.exit(1);
  }
};

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('Usage: node makeAdmin.js <email>');
  process.exit(1);
}

makeAdmin(email); 