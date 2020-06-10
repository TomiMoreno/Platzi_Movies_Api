const express = require('express');
const app = express();
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovie');
const authApi = require('./routes/auth')
const { config } = require('./config/index');
const morgan = require('morgan');
const cors = require('cors');

const {
  logErrors,
  errorHandler,
  wrapError
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');
// app.use(cors);
app.use(express.json());
app.use(morgan('tiny'));

moviesApi(app);
userMoviesApi(app);
authApi(app);

//Catch 404
app.use(notFoundHandler);
//Error handlers
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
