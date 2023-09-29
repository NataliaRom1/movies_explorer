const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovieById } = require('../middlwares/validation');
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', validateCreateMovie, createMovie);

router.delete('/movies/:movieId', validateDeleteMovieById, deleteMovieById);

module.exports = router;
