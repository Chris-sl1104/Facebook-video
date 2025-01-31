

const express = require('express');
const { getVideoPlaybackUrl } = require('../controllers/videoController');

const router = express.Router();

/**
 * Fetch Video Playback URL
 *
 * API Endpoint:
 * GET /video/playback/:videoId
 *
 * Path Parameters:
 * videoId (string) - The unique identifier of the video
 *
 * Description:
 * Retrieves the playback URL for a given video (either VOD or live stream).
 */
router.get('/video/playback/:videoId', getVideoPlaybackUrl);

module.exports = router;
