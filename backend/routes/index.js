const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login, signOut } = require('../controllers/users');
const { validateSignUp, validateSignIn } = require('../middlwares/validation');
const auth = require('../middlwares/auth');
const NotFoundError = require('../middlwares/errors/NotFoundError');

router.post('/signup', validateSignUp, createUser);

router.post('/signin', validateSignIn, login);

router.post('/signout', signOut);

router.use(auth);

router.use(userRoutes); // '/users'
router.use(movieRoutes); // '/movies'
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});

module.exports = router;
