import React, { useEffect, useState, useRef } from "react";
import {
    Card,
    Avatar,
    Typography,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    CardMedia,
    Paper,
    IconButton,
} from "@mui/material";
import { ThumbUp, ChatBubbleOutline } from "@mui/icons-material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { fetchComments } from "../api/videoApi.js";

const VITE_VIDEO_ID = import.meta.env.VITE_VIDEO_ID;

// ------------------ Styled Components ------------------

// Style for the reply container
const ReplyBox = styled(Box)(({ theme }) => ({
    paddingLeft: theme.spacing(5),
    borderLeft: `3px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(1),
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    padding: "10px",
}));

// ------------------ Child Component: VideoPlayer ------------------
const VideoPlayer = ({ source, fallbackUrl }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Mute to avoid browser auto-play blocking
            video.muted = true;
            video.play().catch((err) => console.log("AutoPlay failed:", err));
        }
    }, []);

    // If no video link exists, show a hint or link to Facebook
    if (!source) {
        return (
            <Typography variant="caption" color="text.secondary">
                <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
                    View Video on Facebook
                </a>
            </Typography>
        );
    }

    return (
        <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{ borderRadius: "10px", maxWidth: "100%", height: "auto" }}
        >
            <source src={source} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

// ------------------ Child Component: RepliesList ------------------
const RepliesList = ({ replies }) => {
    // Do not render if replies is undefined or empty
    if (!Array.isArray(replies) || replies.length === 0) return null;

    return (
        <Box sx={{ paddingLeft: 4, borderLeft: "3px solid #ddd", marginTop: 1 }}>
            {replies.map((reply) => (
                <motion.div
                    key={reply.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ReplyBox>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    src={reply.from.picture?.data?.url}
                                    sx={{ border: "2px solid #FF9800", boxShadow: 1 }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                                        {reply.from.name}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body2">{reply.message}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(reply.created_time).toLocaleString()}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>

                        {/* Render image or video if available */}
                        {reply.attachment?.media && (
                            <Box sx={{ textAlign: "center", padding: 1 }}>
                                {reply.attachment.media.image?.src ? (
                                    <CardMedia
                                        component="img"
                                        image={reply.attachment.media.image.src}
                                        alt="Attachment"
                                        sx={{
                                            borderRadius: 3,
                                            maxWidth: "230px",
                                            maxHeight: "230px",
                                            objectFit: "cover",
                                            height: "auto",
                                            boxShadow: 2,
                                        }}
                                    />
                                ) : (
                                    reply.attachment.media.source && (
                                        <VideoPlayer
                                            source={reply.attachment.media.source}
                                            fallbackUrl={reply.attachment.url}
                                        />
                                    )
                                )}
                            </Box>
                        )}

                        {/* Recursively render child replies */}
                        {reply.replies?.length > 0 && <RepliesList replies={reply.replies} />}
                    </ReplyBox>
                </motion.div>
            ))}
        </Box>
    );
};

// ------------------ Child Component: CommentItem ------------------
const CommentItem = ({ comment }) => {
    return (
        <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card
                variant="outlined"
                sx={{
                    padding: 2,
                    borderRadius: "16px",
                    backgroundColor: "white",
                    marginBottom: 2,
                    boxShadow: 2,
                }}
            >
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            src={comment.from.picture?.data?.url}
                            sx={{ border: "3px solid #4CAF50", boxShadow: 2 }}
                        />
                    </ListItemAvatar>

                    <ListItemText
                        primary={
                            <Typography sx={{ fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
                                {comment.from.name}
                            </Typography>
                        }
                        secondary={
                            <>
                                <Typography variant="body2" color="text.primary">
                                    {comment.message || ""}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(comment.created_time).toLocaleString()}
                                </Typography>
                                <br />
                                {comment.reactions && (
                                    <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                                        <IconButton size="small" color="primary">
                                            <ThumbUp fontSize="small" />
                                        </IconButton>
                                        {comment.reactions?.summary?.total_count > 0 && (
                                            <Typography variant="caption" color="text.secondary">
                                                {comment.reactions.summary.total_count} Likes
                                            </Typography>
                                        )}
                                        <IconButton size="small" color="secondary">
                                            <ChatBubbleOutline fontSize="small" />
                                        </IconButton>
                                    </Box>
                                )}
                            </>
                        }
                    />
                </ListItem>

                {/* Render image or video if available */}
                {comment.attachment?.media && (
                    <Box sx={{ textAlign: "center", padding: 1 }}>
                        {comment.attachment.type === "photo" ? (
                            <CardMedia
                                component="img"
                                image={comment.attachment.media.image.src}
                                alt="Attachment"
                                sx={{
                                    borderRadius: 3,
                                    maxWidth: "300px",
                                    maxHeight: "300px",
                                    objectFit: "cover",
                                    boxShadow: 2,
                                }}
                            />
                        ) : (
                            <VideoPlayer
                                source={comment.attachment.media.source}
                                fallbackUrl={comment.attachment.url}
                            />
                        )}
                    </Box>
                )}

                {/* Render replies if present */}
                {comment.replies?.length > 0 && <RepliesList replies={comment.replies} />}
            </Card>
        </motion.div>
    );
};

// ------------------ Main Component: CommentList ------------------
const CommentList = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch comment data
        fetchComments(VITE_VIDEO_ID).then((data) => {
            setComments(data);
        });
    }, []);

    return (
        <Paper
            sx={{
                padding: 3,
                maxWidth: 700,
                margin: "auto",
                borderRadius: "16px",
                backgroundColor: "#fafafa",
            }}
        >
            <Typography
                variant="h5"
                sx={{ marginBottom: 2, fontWeight: "bold", color: "#333", textAlign: "center" }}
            >
                💬 Comments
            </Typography>

            <List>
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </List>
        </Paper>
    );
};

export default CommentList;
