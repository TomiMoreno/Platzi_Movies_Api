const express = require('express');
const app = express();
const moviesApi = require('./routes/movies');
const { config } = require('./config/index');

const {
  logErrors,
  errorHandler,
  wrapError
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');
app.use(express.json());

moviesApi(app);

//Catch 404
app.use(notFoundHandler);
//Error handlers
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
