// services/suggestedMealService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/suggested-meals";

/**
 * Fetch all suggested meals.
 */
export const getSuggestedMeals = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching suggested meals:", error.message);
    throw error;
  }
};

/**
 * Save a new suggested meal.
 * @param {Object} mealData - Meal object with name, ingredients, nutrients, and recipe.
 */
export const saveSuggestedMeal = async (mealData) => {
  try {
    const response = await axios.post(BASE_URL, mealData);
    return response.data;
  } catch (error) {
    console.error("Error saving suggested meal:", error.message);
    throw error;
  }
};

/**
 * Delete a suggested meal by ID.
 * @param {string} mealId - ID of the meal to delete.
 */
export const deleteSuggestedMeal = async (mealId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${mealId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting suggested meal:", error.message);
    throw error;
  }
};
