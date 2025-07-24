const SuggestedMeal = require('../models/SuggestedMeal');

// @desc    Get all suggested meals (public access)
const getAllSuggestedMeals = async (req, res) => {
  try {
    const meals = await SuggestedMeal.find(); // No user filter
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suggested meals', error });
  }
};

// @desc    Save a new suggested meal (public access)
const saveSuggestedMeal = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat, ingredients, recipe } = req.body;

    const newMeal = new SuggestedMeal({
      // No user association
      name,
      calories,
      protein,
      carbs,
      fat,
      ingredients,
      recipe,
    });

    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(500).json({ message: 'Error saving suggested meal', error });
  }
};

// @desc    Delete a suggested meal by ID (public access)
const deleteSuggestedMeal = async (req, res) => {
  try {
    const meal = await SuggestedMeal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    await meal.deleteOne();
    res.status(200).json({ message: 'Suggested meal deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting suggested meal', error });
  }
};

module.exports = {
  getAllSuggestedMeals,
  saveSuggestedMeal,
  deleteSuggestedMeal,
};
