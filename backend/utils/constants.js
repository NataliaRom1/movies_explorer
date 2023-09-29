const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb'; // Подключаемся к серверу mongo mongodb://localhost:27017/mestodb   //127.0.0.1:27017/mestodb
const { PORT = 3000 } = process.env;
const { NODE_ENV, JWT_SECRET } = process.env;
const DEV_SECRET = 'SUPERSECRET';

const DUPLICATE_KEY_ERROR_COLLECTION = 11000;

const URL_PATTERN = /^(https?:\/\/)(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&amp;'()*+,;=]+(#)?$/;

module.exports = {
  DB_URL,
  PORT,
  NODE_ENV,
  DEV_SECRET,
  DUPLICATE_KEY_ERROR_COLLECTION,
  JWT_SECRET,
  URL_PATTERN,
};
