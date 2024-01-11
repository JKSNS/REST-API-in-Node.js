/*
This file is for creating a Mongoose Model/Schema
*/


// Task.js

var mongoose = require('mongoose');

// Define the Task schema
var taskSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true
  },
  Text: {
    type: String,
    required: true
  },
  Done: {
    type: Boolean,
    default: false
  },
  Date: {
    type: String,
    required: true
  }
}, {
  collection: 'tasks' // Specify the collection name for storing tasks
});

// Create the Task model
var Task = mongoose.model('Task', taskSchema);

// Export the Task model
module.exports = Task;
