const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true
  }
});

module.exports = TodoSchema;