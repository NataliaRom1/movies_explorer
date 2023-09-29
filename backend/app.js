require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlwares/limiter');
const cors = require('./middlwares/cors');
const router = require('./routes');
const errorHandler = require('./middlwares/error');
const { requestLogger, errorLogger } = require('./middlwares/logger');
const { DB_URL, PORT } = require('./utils/constants');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors);
app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
