import * as authService from '../services/auth.service.js';

/**
 * Signup - Create new user and return token
 * POST /api/auth/signup
 */
export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            const error = new Error('Username, email, and password are required');
            error.statusCode = 400;
            throw error;
        }

        if (username.length < 3) {
            const error = new Error('Username must be at least 3 characters');
            error.statusCode = 400;
            throw error;
        }

        if (password.length < 6) {
            const error = new Error('Password must be at least 6 characters');
            error.statusCode = 400;
            throw error;
        }

        // Create user
        const user = await authService.createUser(username, email, password);

        // Generate token
        const token = authService.generateToken(user._id);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Login - Authenticate user and return token
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        // Find user
        const user = await authService.findUserByEmail(email);
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        // Check password
        const isValidPassword = await authService.comparePassword(password, user.passwordHash);
        if (!isValidPassword) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        // Generate token
        const token = authService.generateToken(user._id);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Logout - Client-side logout (token invalidation on client)
 * POST /api/auth/logout
 * 
 * Note: For JWT-based auth, logout is typically handled client-side
 * by removing the token. This endpoint confirms the logout action.
 */
export const logout = async (req, res, next) => {
    try {
        // In JWT auth, actual logout happens on client side
        // This endpoint can be used for logging, analytics, or token blacklisting in the future
        res.status(200).json({
            message: 'Logout successful',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
    try {
        const user = await authService.findUserById(req.user.id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};
