const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: String,
  otp: Number,
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: 250 } //seconds not work correctly
  }
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model.otp || mongoose.model('otp', otpSchema);