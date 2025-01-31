const { PORT } = require('./config/env');
const { logger } = require('./config/logger');
const app = require('./app');

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}!!`);
});
