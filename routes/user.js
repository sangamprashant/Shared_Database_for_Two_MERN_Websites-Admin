const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("sharedUser");
const jwt = require("jsonwebtoken");
// Define a route to handle login
router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user ||user.password !== password || user.account !== "admin") {
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      // Generate a JWT token for authentication
      const token = jwt.sign({ userId: user._id }, "your-secret-key");

      // Respond with the token
      res.status(200).json({ token,user });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Define a route to create a new user
router.post("/api/create/user", async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, password, account } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password,
      account,
      // Add other fields as needed
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    // Handle any errors and respond with an error message
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});
// Define a route to fetch and view all users
router.get("/api/view/users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({ account: "user" });

    // Send the users as a JSON response
    res.json(users);
  } catch (error) {
    // Handle any errors and respond with an error message
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});
module.exports = router;
