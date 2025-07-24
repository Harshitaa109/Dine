const ManualMeal = require("../models/ManualMeal");

// @desc    Get all manual meals (public access)
const getAllManualMeals = async (req, res) => {
  try {
    const meals = await ManualMeal.find().sort({ date: -1 });
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching manual meals:", error.message);
    res.status(500).json({ message: "Error fetching manual meals", error: error.message });
  }
};

// @desc    Add a new manual meal (public access)
const addManualMeal = async (req, res) => {
  try {
    const { name, ingredients, nutrients } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Meal name is required" });
    }

    const newMeal = new ManualMeal({
      name,
      ingredients,
      nutrients,
    });

    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    console.error("Error adding manual meal:", error.message);
    res.status(500).json({ message: "Error adding manual meal", error: error.message });
  }
};

// @desc    Delete a manual meal by ID (public access)
const deleteManualMeal = async (req, res) => {
  try {
    const meal = await ManualMeal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    await meal.deleteOne();
    res.status(200).json({ message: "Manual meal deleted" });
  } catch (error) {
    console.error("Error deleting manual meal:", error.message);
    res.status(500).json({ message: "Error deleting manual meal", error: error.message });
  }
};

module.exports = {
  getAllManualMeals,
  addManualMeal,
  deleteManualMeal,
};
