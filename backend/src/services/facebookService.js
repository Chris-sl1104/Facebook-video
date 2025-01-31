const { apiRequest } = require('../utils/apiHelper');
const { FACEBOOK_ACCESS_TOKEN, GRAPH_API_URL, GRAPH_API_VERSION } = require('../config/env');
const { checkVideoType } = require('./videoService');
const {
    VOD_COMMENT_FIELDS,
    LIVE_COMMENT_FIELDS,
    LIVE_VIDEO_DETAIL_FIELDS,
    VOD_VIDEO_DETAIL_FIELDS,
    VOD_POST_REACTIONS_FIELDS,
    VOD_VIDEO_FIELDS,
    LIVE_VIDEO_FIELDS
} = require('../config/constants');

/**
 * Fetch Video Details (Auto-detects VOD or Live)
 *
 * @param {string} videoId - Unique video ID
 * @returns {Promise<Object>} - Video details
 */
exports.fetchVideoDetails = async (videoId) => {
    try {
        console.log(`DEBUG: fetchVideoDetails called with videoId=${videoId}`);

        const isLive = await checkVideoType(videoId);

        let videoDetails;
        if (isLive) {
            console.log(`DEBUG: Video ${videoId} is a Live Video`);
            const liveVideoUrl = `${GRAPH_API_URL}/${GRAPH_API_VERSION}/live_videos/${videoId}?fields=${LIVE_VIDEO_DETAIL_FIELDS}&access_token=${FACEBOOK_ACCESS_TOKEN}`;
            videoDetails = await apiRequest({ url: liveVideoUrl });
        } else {
            console.log(`DEBUG: Video ${videoId} is a VOD`);
            const videoUrl = `${GRAPH_API_URL}/${GRAPH_API_VERSION}/${videoId}?fields=${VOD_VIDEO_DETAIL_FIELDS}&access_token=${FACEBOOK_ACCESS_TOKEN}`;
            videoDetails = await apiRequest({ url: videoUrl });
        }

        return videoDetails;
    } catch (error) {
        console.error('ERROR in fetchVideoDetails:', error);
        throw error;
    }
};


/**
 * Fetch Comments for a Video (Supports VOD & Live)
 *
 * @param {string} videoId - Video ID
 * @param {boolean} isLive - Indicates if it's a live video
 * @returns {Promise<Object>} - Complete comment data
 */
exports.fetchVideoComments = async (videoId, isLive = false) => {
    try {
        const cleanVideoId = videoId.trim();

        // Determine API endpoint & fields based on video type
        const endpoint = isLive ? 'live_comments' : 'comments';
        const fields = isLive ? LIVE_COMMENT_FIELDS : VOD_COMMENT_FIELDS;

        let url = `${GRAPH_API_URL}/${GRAPH_API_VERSION}/${cleanVideoId}/${endpoint}?fields=${encodeURIComponent(fields)}&access_token=${FACEBOOK_ACCESS_TOKEN}`;

        console.log(`Fetching comments: ${url}`);

        let allComments = [];
        let response = await apiRequest({ url });

        while (response && response.data) {
            allComments = allComments.concat(response.data);

            if (response.paging && response.paging.next) {
                console.log("Fetching next page...");
                response = await apiRequest({ url: response.paging.next });
            } else {
                break;
            }
        }

        // Process nested comments for VOD (Live doesn't support nesting)
        if (!isLive) {
            allComments = await processNestedComments(allComments);
        }

        return { data: allComments };
    } catch (error) {
        console.error('Error in fetchVideoComments:', error);
        throw error;
    }
};

/**
 * Recursively Fetch Nested Comments for VOD Videos
 *
 * @param {Array} comments - List of comments
 * @returns {Promise<Array>} - Processed comments with nested replies
 */
const processNestedComments = async (comments) => {
    for (let comment of comments) {
        if (comment.comment_count > 0) {
            console.log(`Fetching replies for comment ${comment.id}`);

            let repliesUrl = `${GRAPH_API_URL}/${GRAPH_API_VERSION}/${comment.id}/comments?fields=id,message,from{id,name,picture},created_time,attachment{media,type,url},reactions.summary(true).limit(0)&access_token=${FACEBOOK_ACCESS_TOKEN}`;

            let replies = [];
            let response = await apiRequest({ url: repliesUrl });

            while (response && response.data) {
                replies = replies.concat(response.data);
                if (response.paging && response.paging.next) {
                    console.log("Fetching next page of replies...");
                    response = await apiRequest({ url: response.paging.next });
                } else {
                    break;
                }
            }

            comment.replies = replies;
        } else {
            comment.replies = [];
        }
    }
    return comments;
};


/**
 * Fetch Video Playback URL (VOD & Live)
 * VOD: Returns `source` (MP4 playback URL)
 * Live: Returns `stream_url` (RTMP stream URL)
 *
 * @param {string} videoId - Unique video ID
 * @returns {Promise<Object>} - Playback URL data
 */
exports.fetchVideoPlaybackUrl = async (videoId) => {
    try {
        console.log(`DEBUG: fetchVideoPlaybackUrl called with videoId=${videoId}`);

        // Determine if the video is Live or VOD
        const isLive = await checkVideoType(videoId);

        let videoDetails;
        if (isLive) {
            console.log(`DEBUG: Video ${videoId} is a Live Video`);
            const liveVideoUrl = `${GRAPH_API_URL}/${GRAPH_API_VERSION}/live_videos/${videoId}?fields=${LIVE_VIDEO_FIELDS}&access_token=${FACEBOOK_ACCESS_TOKEN}`;
            videoDetails = await apiRequest({ url: liveVideoUrl });
        } else {
            console.log(`DEBUG: Video ${videoId} is a VOD`);
            const videoUrl = `${GRAPH_API_URL}/${GRAPH_API_VERSION}/${videoId}?fields=${VOD_VIDEO_FIELDS}&access_token=${FACEBOOK_ACCESS_TOKEN}`;
            videoDetails = await apiRequest({ url: videoUrl });
        }

        return videoDetails;
    } catch (error) {
        console.error('Error in fetchVideoPlaybackUrl:', error);
        throw error;
    }
};