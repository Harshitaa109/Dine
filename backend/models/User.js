const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional or keep if you want plain text (not recommended)
});

// Remove pre-save hook and password comparison method

module.exports = mongoose.model("User", userSchema);
