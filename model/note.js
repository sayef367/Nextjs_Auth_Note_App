const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: String,
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.models = {};
module.exports = mongoose.model.notes || mongoose.model('notes', noteSchema);
