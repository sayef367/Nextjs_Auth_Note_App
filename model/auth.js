const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: String,
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.models = {};
module.exports = mongoose.model.users || mongoose.model('users', userSchema);