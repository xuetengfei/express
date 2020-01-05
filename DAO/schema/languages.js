const mongoose = require('mongoose');

const languagesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('languages', languagesSchema);
