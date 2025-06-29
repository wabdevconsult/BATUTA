import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // In development mode without MONGODB_URI, skip database connection
    if (process.env.NODE_ENV === 'development' && !process.env.MONGODB_URI) {
      console.log('⚠ No MONGODB_URI found in development mode');
      console.log('⚠ Running in demo mode without database');
      return false;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✓ MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log('⚠ MongoDB connection failed:', error.message);
    console.log('⚠ Running in demo mode without database');
    return false;
  }
};

export default connectDB;