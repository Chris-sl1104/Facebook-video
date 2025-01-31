import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Box, Typography, CircularProgress, Alert, Container, Grid} from '@mui/material';
import { fetchVideoAsync } from '../store/slices/videoSlice.js';
import {fetchVideoDetails} from "../api/videoApi.js";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const DEFAULT_VIDEO_ID = import.meta.env.VITE_VIDEO_ID || '241540867013420'; // Load from env

const VideoPlayer = () => {
    const dispatch = useDispatch();
    const { videoData, loading, error } = useSelector((state) => state.video);
    const [videoDetails, setVideoDetails] = useState(null);

    useEffect(() => {
        const loadVideoDetails = async () => {
            const data = await fetchVideoDetails(DEFAULT_VIDEO_ID);
            setVideoDetails(data);
        };

        loadVideoDetails();
    }, []);

    // Fetch video on component mount
    useEffect(() => {
        dispatch(fetchVideoAsync(DEFAULT_VIDEO_ID));
    }, [dispatch]);



    useEffect(() => {
        console.log(videoData);
    }, [videoData]);

    const formatDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(date);
    };


    return (

        <Container maxWidth="md">
            <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                {/* Loading State */}
                {loading && <CircularProgress />}

                {/* Error Handling */}
                {error && <Alert severity="error">{error}</Alert>}

                {/* Video Content */}
                {videoData && !loading && !error && (
                    <Box sx={{ width: "100%", maxWidth: "800px", textAlign: "center" }}>
                        {/* Video Title */}
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {videoData.title || "Untitled Video"}
                        </Typography>

                        {/* Video Player */}
                        <video
                            src={videoData.source}
                            controls
                            autoPlay
                            muted={false}
                            style={{
                                width: "100%",
                                maxWidth: "800px",
                                borderRadius: "14px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)"
                            }}
                        />

                        <Grid container spacing={0.5} alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                            <Grid item xs={8} sm={9} sx={{ textAlign: "left", pl: 2 }}>
                                {videoData.description && (
                                    <Typography variant="body1" color="text.primary">
                                        {videoData.description}
                                    </Typography>
                                )}

                                {videoData.created_time && (
                                    <Typography variant="body2" color="text.secondary">
                                        Created on: {formatDate(videoData.created_time)}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid
                                item
                                xs={4}
                                sm={3}
                                sx={{
                                    textAlign: "right",
                                    pr: 2,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignSelf: "flex-start",
                                    mt: -0.5
                                }}
                            >
                                {videoDetails.likes?.summary?.total_count > 0 && (
                                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                                        <ThumbUpIcon fontSize="inherit" sx={{ ml: 0.5, color: "#1877F2" }} />
                                        <FavoriteRoundedIcon fontSize="inherit" sx={{ color: "#F02849", mr: 0.8 }} />
                                        {videoDetails.likes.summary.total_count} and others
                                    </Typography>
                                )}

                            </Grid>
                        </Grid>

                    </Box>
                )}

            </Box>
            <Box mt={4} />
        </Container>

    );
};

export default VideoPlayer;
