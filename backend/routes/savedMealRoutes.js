const express = require("express");
const router = express.Router();
const SavedMeal = require("../models/SavedMeal");

// No authentication middleware applied

// @route   GET /api/saved-meals
// @desc    Get all saved meals (public access)
router.get("/", async (req, res) => {
  try {
    const meals = await SavedMeal.find(); // Get all meals without user filter
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch saved meals" });
  }
});

// @route   POST /api/saved-meals
// @desc    Save a new meal (public access)
router.post("/", async (req, res) => {
  const { name, calories, protein, carbs, fat, date } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Meal name is required" });
  }

  try {
    const newMeal = new SavedMeal({
      name,
      calories,
      protein,
      carbs,
      fat,
      date,
      // Removed user field
    });

    const saved = await newMeal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save meal" });
  }
});

// @route   DELETE /api/saved-meals/:id
// @desc    Delete a saved meal by ID (public access)
router.delete("/:id", async (req, res) => {
  try {
    const meal = await SavedMeal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    // Removed user ownership check

    await meal.remove();
    res.json({ message: "Meal deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete meal" });
  }
});

module.exports = router;
