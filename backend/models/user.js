const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    default: 'Стандартное имя',
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Invalid email',
    },
  },

  password: {
    type: String,
    select: false,
    required: true,
  },

});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);
