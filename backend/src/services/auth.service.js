import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import config from '../config/index.js';

const SALT_ROUNDS = 12;

/**
 * Hash a plain text password
 */
export const hashPassword = async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare plain text password with hash
 */
export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

/**
 * Generate JWT token for user
 */
export const generateToken = (userId) => {
    return jwt.sign({ userId }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
    });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};

/**
 * Create a new user
 */
export const createUser = async (username, email, password) => {
    // Check if user already exists by email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        const error = new Error('User with this email already exists');
        error.statusCode = 409;
        throw error;
    }

    // Check if username is taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        const error = new Error('Username is already taken');
        error.statusCode = 409;
        throw error;
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const user = await User.create({ username, email, passwordHash });

    return user;
};

/**
 * Find user by email (includes passwordHash for auth)
 */
export const findUserByEmail = async (email) => {
    return User.findOne({ email }).select('+passwordHash');
};

/**
 * Find user by ID
 */
export const findUserById = async (userId) => {
    return User.findById(userId);
};
