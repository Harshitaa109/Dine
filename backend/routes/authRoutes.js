const express = require("express");
const router = express.Router();

// Signup dummy route (no user creation)
router.post("/signup", (req, res) => {
  res.status(200).json({ message: "Signup disabled" });
});

// Login dummy route (no auth)
router.post("/login", (req, res) => {
  res.status(200).json({ message: "Login disabled" });
});

module.exports = router;
