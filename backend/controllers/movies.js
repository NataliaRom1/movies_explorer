const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { STATUS_OK, STATUS_CREATED } = require('../utils/statuses');
const NotFoundError = require('../middlwares/errors/NotFoundError');
const BadRequestError = require('../middlwares/errors/BadRequestError');
const ForbiddenError = require('../middlwares/errors/ForbiddenError');
const {
  BadRequestErrorMessage,
  ForbiddenErrorMessage,
  NotFoundMovieErrorMessage,
} = require('../utils/errorMessages');

const getMovies = async (req, res, next) => {
  const owner = req.user._id;

  try {
    const movies = await Movie.find({ owner });
    res.status(STATUS_OK).send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
    res.status(STATUS_CREATED).send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(BadRequestErrorMessage));
    } else {
      next(err);
    }
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      throw new NotFoundError(NotFoundMovieErrorMessage);
    } else if (movie.owner.toString() === req.user._id) {
      await Movie.deleteOne(movie);
      res.status(STATUS_OK).send(movie);
    } else {
      throw new ForbiddenError(ForbiddenErrorMessage);
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(BadRequestErrorMessage));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
