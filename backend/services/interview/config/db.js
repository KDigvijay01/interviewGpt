import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const dbConfig = {
  uri: process.env.MONGODB_URI
};

export const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default dbConfig;
