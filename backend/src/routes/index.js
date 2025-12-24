import express from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import audioRoutes from './audio.routes.js';

const router = express.Router();

// Mount routes
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/audio', audioRoutes);

export default router;
