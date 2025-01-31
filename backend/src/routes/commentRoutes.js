const express = require('express');
const router = express.Router();
const {
    getVideoDetails,
    getVideoComments
} = require('../controllers/commentController');

/**
 * Fetch Video Details (Auto-detects VOD or Live)
 *
 * API Endpoint:
 * GET /video/details/:id
 *
 * Query Parameters:
 *   ?type=live  -> Fetch live video details
 *   ?type=vod   -> Fetch on-demand video details
 */
router.get('/details/:id', getVideoDetails);

/**
 * Fetch Video Comments (Supports VOD & Live)
 *
 * API Endpoint:
 * GET /video/comments/:id
 *
 * Query Parameters:
 *   ?type=live  -> Fetch comments for a live video
 *   ?type=vod   -> Fetch comments for a VOD video
 */
router.get('/comments/:id', getVideoComments);

module.exports = router;
