import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',

    // Database
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/voicebrief',

    // JWT
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

    // Cloudinary
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },

    // AssemblyAI (ASR)
    assemblyAI: {
        apiKey: process.env.ASSEMBLYAI_API_KEY,
    },

    // Gemini (LLM Summarization) - backup
    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
    },

    // Groq (LLM Summarization) - primary
    groq: {
        apiKey: process.env.GROQ_API_KEY,
    },
};

export default config;
