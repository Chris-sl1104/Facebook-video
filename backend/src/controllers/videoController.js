
const { fetchVideoPlaybackUrl } = require('../services/facebookService');
const { logger } = require('../config/logger');

/**
 * Fetch Video Playback URL
 *
 * API Endpoint:
 * GET /video/playback/:videoId
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {JSON} Video playback URL response
 */
exports.getVideoPlaybackUrl = async (req, res, next) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ error: 'videoId is required' });
        }
        const videoData = await fetchVideoPlaybackUrl(videoId);
        return res.json(videoData);
    } catch (error) {
        logger.error('Error in getVideoPlaybackUrl:', error);
        next(error);
    }
};
