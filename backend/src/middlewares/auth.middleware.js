import * as authService from '../services/auth.service.js';

/**
 * JWT Authentication Middleware
 * Extracts token from Authorization header and verifies it
 */
const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new Error('Unauthorized - No token provided');
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = authService.verifyToken(token);

        // Get user from database
        const user = await authService.findUserById(decoded.userId);

        if (!user) {
            const error = new Error('Unauthorized - User not found');
            error.statusCode = 401;
            throw error;
        }

        // Attach user to request
        req.user = {
            id: user._id,
            email: user.email,
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            error.message = 'Unauthorized - Invalid token';
            error.statusCode = 401;
        } else if (error.name === 'TokenExpiredError') {
            error.message = 'Unauthorized - Token expired';
            error.statusCode = 401;
        }
        next(error);
    }
};

export default authMiddleware;
