require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    FACEBOOK_ACCESS_TOKEN: process.env.FACEBOOK_ACCESS_TOKEN,
    GRAPH_API_URL: process.env.GRAPH_API_URL || 'https://graph.facebook.com',
    GRAPH_API_VERSION: process.env.GRAPH_API_VERSION || 'v16.0'
};
