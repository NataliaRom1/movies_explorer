const { celebrate, Joi } = require('celebrate');
const { URL_PATTERN } = require('../utils/constants');

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().not(0).required(),
    year: Joi.number().not(0).required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_PATTERN),
    trailerLink: Joi.string().required().pattern(URL_PATTERN),
    thumbnail: Joi.string().required().pattern(URL_PATTERN),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateCreateMovie,
  validateDeleteMovieById,
};
