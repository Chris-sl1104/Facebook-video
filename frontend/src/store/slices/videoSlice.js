import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchVideo } from '../../api/videoApi.js';

export const fetchVideoAsync = createAsyncThunk('video/fetchVideo', async (videoId) => {
    return await fetchVideo(videoId);
});

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videoData: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideoAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVideoAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.videoData = action.payload;
            })
            .addCase(fetchVideoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch video';
            });
    },
});

export default videoSlice.reducer;
