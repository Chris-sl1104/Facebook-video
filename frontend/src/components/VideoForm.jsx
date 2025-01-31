import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVideoAsync } from '../store/slices/videoSlice.js';
import { TextField, Button, Box } from '@mui/material';

const VideoForm = () => {
    const [videoId, setVideoId] = useState('');
    const dispatch = useDispatch();

    const handleFetch = () => {
        if (videoId) {
            dispatch(fetchVideoAsync(videoId));
        }
    };

    return (
        <Box display="flex" gap={2} mt={2}>
            <TextField
                label="Facebook Video ID"
                variant="outlined"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleFetch}>
                Fetch Video
            </Button>
        </Box>
    );
};

export default VideoForm;
