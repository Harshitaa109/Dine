const mongoose = require("mongoose");

const manualMealSchema = new mongoose.Schema({
  // Removed user field
  name: { type: String, required: true },
  ingredients: { type: String, required: true }, // ✅ kept as is
  nutrients: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ManualMeal", manualMealSchema);
