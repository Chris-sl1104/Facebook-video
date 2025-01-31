const { fetchVideoDetails, fetchVideoComments } = require('../services/facebookService');
const { logger } = require('../config/logger');

/**
 * Fetch Video Details (Auto-detects VOD or Live)
 *
 * API Endpoint:
 * GET /video/details/:id
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {JSON} Video details response
 */
exports.getVideoDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'video id is required' });
        }
        console.log(`DEBUG: Fetching details for videoId=${id} (Auto Detect)`);

        const details = await fetchVideoDetails(id);

        return res.json(details);
    } catch (error) {
        logger.error('Error in getVideoDetails:', error);
        next(error);
    }
};

/**
 * Fetch Video Comments (Supports both VOD & Live)
 *
 * API Endpoints:
 * GET /video/comments/:id?type=live
 * GET /video/comments/:id?type=vod
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {JSON} Video comments response
 */
exports.getVideoComments = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'video id is required' });
        }

        const isLive = (req.query.type === 'live');
        const comments = await fetchVideoComments(id, isLive);

        return res.json(comments);
    } catch (error) {
        logger.error('Error in getVideoComments:', error);
        next(error);
    }
};