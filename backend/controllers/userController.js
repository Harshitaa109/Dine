// Removed User and jwt imports since not used
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// Dummy signup - no real user creation
exports.signupUser = async (req, res) => {
  res.status(200).json({ message: "Signup is disabled" });
};

// Dummy login - no real authentication
exports.loginUser = async (req, res) => {
  res.status(200).json({ message: "Login is disabled" });
};

// Dummy profile - no user info
exports.getProfile = async (req, res) => {
  res.status(200).json({ message: "No profile information available" });
};
