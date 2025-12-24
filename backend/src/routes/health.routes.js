import express from 'express';
import * as healthController from '../controllers/health.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET /api/health
router.get('/', healthController.getHealth);

// GET /api/health/protected (requires auth)
router.get('/protected', authMiddleware, healthController.getProtected);

export default router;
