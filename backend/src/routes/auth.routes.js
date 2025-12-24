import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', authController.signup);

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/logout (requires auth)
router.post('/logout', authMiddleware, authController.logout);

// GET /api/auth/me (requires auth)
router.get('/me', authMiddleware, authController.getMe);

export default router;
