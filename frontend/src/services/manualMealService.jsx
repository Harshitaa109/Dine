// services/manualMealService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/manual-meals";

export const getManualMeals = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createManualMeal = async (mealData) => {
  const response = await axios.post(BASE_URL, mealData);
  return response.data;
};

export const deleteManualMeal = async (mealId) => {
  const response = await axios.delete(`${BASE_URL}/${mealId}`);
  return response.data;
};
