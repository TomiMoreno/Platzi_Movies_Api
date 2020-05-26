const express = require('express');
const app = express();
const moviesApi = require('./routes/movies');
const { config } = require('./config/index');

const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');

app.use(express.json());

moviesApi(app);

app.use(errorHandler);
app.use(logErrors);
app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
