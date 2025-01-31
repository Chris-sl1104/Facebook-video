
module.exports = {
    /**
     * VOD Comment Fields
     * Supports nested replies
     */
    VOD_COMMENT_FIELDS: [
        'id',
        'message',
        'created_time',
        'from{id,name,picture}',
        'attachment{media,type,url}',
        'reactions.summary(true).limit(0)',
        'comment_count'
    ].join(','),

    /**
     * Live Video Comment Fields
     * Only supports top-level comments (no nesting)
     */
    LIVE_COMMENT_FIELDS: [
        'id',
        'message',
        'created_time',
        'from{id,name,picture}',
        'attachment{media,type,url}',
        'reactions.summary(true).limit(0)'
    ].join(','),


    /**
     * VOD Video Details Fields
     * retrieving `likes` here
     */
    VOD_VIDEO_DETAIL_FIELDS: [
        'id',
        'title',
        'description',
        'created_time',
        'post_id',
        'likes.summary(true).limit(0)',
        //'comments.limit(100).summary(true)'
        // 'reactions.type(LOVE).summary(true).limit(0)'
    ].join(','),

    /**
     * VOD Post Reactions Fields
     */
    VOD_POST_REACTIONS_FIELDS: [
        'reactions.type(LIKE,LOVE,HAHA,WOW,SAD,ANGRY).summary(true)'
    ].join(','),

    /**
     *  Live Video Details Fields
     */
    LIVE_VIDEO_DETAIL_FIELDS: [
        'id',
        'creation_time',
        'live_status',
        'live_views',
        'stream_url',
        'reactions.type(LIKE,LOVE,HAHA,WOW,SAD,ANGRY).summary(true)',
        'comments.limit(100).summary(true)'
    ].join(','),


    /**
     * General VOD Video Fields
     */
    VOD_VIDEO_FIELDS: [
        'id',
        'title',
        'description',
        'created_time',
        'length',
        'permalink_url',
        'source'
    ].join(','),

    /**
     * General Live Video Fields
     */
    LIVE_VIDEO_FIELDS: [
        'id',
        'creation_time',
        'live_status',
        'live_views',
        'stream_url'
    ].join(',')
};