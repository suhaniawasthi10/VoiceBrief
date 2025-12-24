import mongoose from 'mongoose';
import config from './index.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUri);
        console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('📦 MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error(`📦 MongoDB Error: ${err.message}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('📦 MongoDB connection closed due to app termination');
    process.exit(0);
});

export default connectDB;
