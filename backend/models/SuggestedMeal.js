const mongoose = require("mongoose");

const suggestedMealSchema = new mongoose.Schema({
  // Removed user field
  name: { type: String, required: true },
  ingredients: { type: [String], default: [] },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SuggestedMeal", suggestedMealSchema);
