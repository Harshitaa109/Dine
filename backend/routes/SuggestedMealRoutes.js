const express = require('express');
const router = express.Router();

const {
  getAllSuggestedMeals,
  saveSuggestedMeal,
  deleteSuggestedMeal
} = require('../controllers/suggestedMealController');

// No authentication middleware applied

// @route   GET /api/suggested-meals
// @desc    Get all suggested meals (public access)
router.get('/', getAllSuggestedMeals);

// @route   POST /api/suggested-meals
// @desc    Save a new suggested meal (public access)
router.post('/', saveSuggestedMeal);

// @route   DELETE /api/suggested-meals/:id
// @desc    Delete a suggested meal (public access)
router.delete('/:id', deleteSuggestedMeal);

module.exports = router;
