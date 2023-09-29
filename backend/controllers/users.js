const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const { STATUS_OK, STATUS_CREATED } = require('../utils/statuses');
const NotFoundError = require('../middlwares/errors/NotFoundError');
const BadRequestError = require('../middlwares/errors/BadRequestError');
const ConflictError = require('../middlwares/errors/ConflictError');
const UnauthorizedError = require('../middlwares/errors/UnauthorizedError');
const { SignOutSuccessfulMessage } = require('../utils/successMessages');
const {
  NODE_ENV,
  JWT_SECRET,
  DUPLICATE_KEY_ERROR_COLLECTION,
  DEV_SECRET,
} = require('../utils/constants');
const {
  BadRequestErrorMessage,
  UnauthorizedErrorMessage,
  NotFoundUserErrorMessage,
  ConflictErrorUserMessage,
} = require('../utils/errorMessages');

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // (res.status(STATUS_OK).send({ email: user.email, name: user.name }));
      (res.status(STATUS_OK).send({ data: user }));
    } else {
      throw new NotFoundError(NotFoundUserErrorMessage);
    }
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(String(password), 10);
    const user = await User
      .create({
        name,
        email,
        password: hashedPassword,
      });
    // res.status(STATUS_CREATED).send({ data: user.toJSON() });
    res.status(STATUS_CREATED).send({ data: user});
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(BadRequestErrorMessage));
    } else if (err.code === DUPLICATE_KEY_ERROR_COLLECTION) {
      next(new ConflictError(ConflictErrorUserMessage));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .select('+password');
    if (user) {
      const isValidUser = await bcrypt.compare(String(password), user.password);
      if (isValidUser) {
        const jwt = jsonWebToken.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET,
        );

        res.cookie('jwt', jwt, {
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
        // res.status(STATUS_OK).send(jwt);
        res.status(STATUS_OK).send({ data: user.toJSON() });
      } else {
        throw new UnauthorizedError(UnauthorizedErrorMessage);
      }
    }
    throw new UnauthorizedError(UnauthorizedErrorMessage);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(BadRequestErrorMessage));
    } else {
      next(err);
    }
  }
};

const signOut = (req, res) => {
  res
    .clearCookie('jwt', {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .status(STATUS_OK)
    .send({ message: SignOutSuccessfulMessage });
};

const updateProfile = async (req, res, next) => {
  const { email, name } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    if (user) {
      (res.status(STATUS_OK).send({user}));
    } else {
      throw new NotFoundError(NotFoundUserErrorMessage);
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(BadRequestErrorMessage));
    } else if (err.code === DUPLICATE_KEY_ERROR_COLLECTION) {
      next(new ConflictError(ConflictErrorUserMessage));
    } else {
      next(err);
    }
  }
};

module.exports = {
  createUser,
  login,
  signOut,
  updateProfile,
  getUserInfo,
};
