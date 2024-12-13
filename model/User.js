const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter username"],
  },
  email: {
    type: String,
    required: [true, "Please enter user email address"],
    unique: [true, "Please enter unique email address"],
  },
  age: {
    type: Number,
    required: [true, "Please enter user age"],
  },
  password: {
    type: String,
    required: [true, "Please enter user password"],
  },
  country: {
    type: String,
    required: true,
  },
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;