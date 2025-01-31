const { logger } = require('../config/logger');

/**
 * Global Error Handling Middleware**
 *
 * Logs errors and provides a structured error response
 * Ensures consistent error messages across the application
 *
 * @param {Error} err - The error object
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports = (err, req, res, next) => {
    // Log error details
    logger.error(`ERROR: ${err.message}\n Stack: ${err.stack}`);

    // Determine response status code
    const statusCode = err.statusCode || 500;

    // Build structured error response
    const errorResponse = {
        success: false,
        status: statusCode,
        message: err.message || 'Internal Server Error',
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
    };

    // Send JSON response
    res.status(statusCode).json(errorResponse);
};
