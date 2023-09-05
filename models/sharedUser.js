// sharedSchema.js

const mongoose = require('mongoose');

// Define a schema for shared data (e.g., for "users" collection)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  account:String,
  // Define other fields as needed
});

// Create a model for the shared data using the schema
const User = mongoose.model('sharedUser', userSchema);

// Export the User model
module.exports = User;
