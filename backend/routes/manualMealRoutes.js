const express = require("express");
const router = express.Router();

const {
  addManualMeal,
  getAllManualMeals,
  deleteManualMeal,
} = require("../controllers/manualMealController");

// 🔓 All routes are now public — no authentication required

// ➕ Add a new manual meal
router.post("/", addManualMeal);

// 📥 Get all manual meals
router.get("/", getAllManualMeals);

// ❌ Delete a manual meal by ID
router.delete("/:id", deleteManualMeal);

module.exports = router;
