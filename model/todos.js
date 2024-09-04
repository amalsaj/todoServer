const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'Users',
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  important: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
