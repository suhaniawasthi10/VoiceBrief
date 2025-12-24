/**
 * Health check controller
 * Thin controller - minimal logic
 */

export const getHealth = (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
};

/**
 * Protected health check - requires authentication
 */
export const getProtected = (req, res) => {
    res.status(200).json({
        message: 'Protected route accessed successfully',
        userId: req.user.id,
        email: req.user.email,
    });
};
