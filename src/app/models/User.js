/*
This file is for creating a Mongoose Model/Schema
*/


// User.js

var mongoose = require('mongoose');
const {Schema} = mongoose; 
// Define the User schema
var userSchema = Schema({
  Id: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  UserName: {
    type: String,
    required: true
  }
}, {
  collection: 'Users' // Specify the collection name for storing users
});

// Create the User model
var User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
