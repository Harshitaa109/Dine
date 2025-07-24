const mongoose = require("mongoose");

const savedMealSchema = new mongoose.Schema({
  // Removed user field
  name: { type: String, required: true },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SavedMeal", savedMealSchema);
