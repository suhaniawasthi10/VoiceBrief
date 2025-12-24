import app from './app.js';
import config from './config/index.js';
import connectDB from './config/db.js';

const startServer = async () => {
    // Connect to database
    await connectDB();

    app.listen(config.port, () => {
        console.log(`🚀 Server running on port ${config.port}`);
        console.log(`📍 Environment: ${config.nodeEnv}`);
        console.log(`💚 Health check: http://localhost:${config.port}/api/health`);
    });
};

startServer();
