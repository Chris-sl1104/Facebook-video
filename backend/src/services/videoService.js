const { apiRequest } = require('../utils/apiHelper');
const { FACEBOOK_ACCESS_TOKEN, GRAPH_API_URL, GRAPH_API_VERSION } = require('../config/env');

/**
 * Determine Video Type (Live or VOD)
 *
 * Uses the `live_status` field to check:
 * "LIVE" → Video is a Live Stream
 * `null` or `undefined` → Video is VOD
 *
 * @param {string} videoId - Unique video ID
 * @returns {Promise<boolean>} - `true` if it's a Live video, `false` if it's VOD
 */
exports.checkVideoType = async (videoId) => {
    try {
        const url = `${GRAPH_API_URL}/${GRAPH_API_VERSION}/${videoId}?fields=live_status&access_token=${FACEBOOK_ACCESS_TOKEN}`;
        console.log(`DEBUG: Checking video type -> ${url}`);

        const response = await apiRequest({ url });

        const isLive = response.live_status === 'LIVE';

        console.log(`DEBUG: Video ID=${videoId}, isLive=${isLive}`);
        return isLive;
    } catch (error) {
        console.error('Error in checkVideoType:', error);
        throw error;
    }
};