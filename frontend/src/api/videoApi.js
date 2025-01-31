import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Generate the API URL to fetch video details.
 * @param {string} videoId - Unique identifier of the video.
 * @returns {string} The full API endpoint URL.
 */
const generateVideoDetailsUrl = (videoId) => `${BASE_URL}/video/details/${videoId}`;

/**
 * Fetch video details (automatically determines whether it's VOD or Live).
 * @param {string} videoId - The unique identifier of the video.
 * @returns {Promise<object|null>} A promise resolving to the video details object, or null if an error occurs.
 */
export const fetchVideoDetails = async (videoId) => {
    if (!videoId) {
        console.error("Error in fetchVideoDetails: videoId is required");
        return null;
    }

    try {
        const response = await axios.get(generateVideoDetailsUrl(videoId));
        return response.data;
    } catch (error) {
        console.error(`Error fetching video details (videoId: ${videoId}):`, error.message || error);
        return null;
    }
};

/**
 * Generate the API URL for video playback.
 * @param {string} videoId - Unique identifier of the video.
 * @returns {string} The full API endpoint URL.
 */
const generateVideoUrl = (videoId) => `${BASE_URL}/api/video/playback/${videoId}`;

/**
 * Fetch video playback data.
 * @param {string} videoId - The unique identifier of the video.
 * @returns {Promise<object|null>} A promise resolving to the playback data object, or null if an error occurs.
 */
export const fetchVideo = async (videoId) => {
    if (!videoId) {
        console.error("Error fetchVideo: videoId is required");
        return null;
    }

    try {
        const response = await axios.get(generateVideoUrl(videoId));
        return response.data;
    } catch (error) {
        console.error("Error fetching video (videoId: " + videoId + "):", error.message || error);
        return null;
    }
};

/**
 * Generate the API URL to fetch video comments.
 * @param {string} videoId - Unique identifier of the video.
 * @returns {string} The full API endpoint URL.
 */
export const getComments = (videoId) => `${BASE_URL}/video/comments/${videoId}`;

/**
 * Fetch comments for a given video.
 * @param {string} videoId - The unique identifier of the video.
 * @returns {Promise<Array>} A promise resolving to an array of comments, or an empty array if an error occurs.
 */
export const fetchComments = async (videoId) => {
    try {
        const response = await axios.get(getComments(videoId));
        return response.data.data || [];
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};
