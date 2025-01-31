const express = require('express');
const morgan = require('morgan');
const commentRoutes = require('./routes/commentRoutes');
const videoRoutes = require('./routes/videoRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
}));

app.use(morgan('dev'));

// Comment-related routes
app.use('/video', commentRoutes);

// Video-related routes
app.use('/api', videoRoutes);

// Global error handler middleware
app.use(errorHandler);

module.exports = app;
