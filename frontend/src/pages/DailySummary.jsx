// src/pages/DailySummary.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const parseNutrients = (nutrientStr) => {
  const nutrients = { calories: 0, protein: 0, fat: 0, carbs: 0 };
  if (!nutrientStr) return nutrients;

  nutrientStr.split(",").forEach((n) => {
    const [key, value] = n.split(":").map((s) => s.trim().toLowerCase());
    const val = parseFloat(value?.replace(/[^\d.]/g, "") || 0);

    if (key.includes("calorie")) nutrients.calories += val;
    else if (key.includes("protein")) nutrients.protein += val;
    else if (key.includes("fat")) nutrients.fat += val;
    else if (key.includes("carb")) nutrients.carbs += val;
  });

  return nutrients;
};

const DailySummary = () => {
  const [summary, setSummary] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  });

  const calculateTotal = async () => {
    try {
      const [manualRes, suggestedRes, savedRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/manual-meals`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/suggested-meals`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/saved-meals`),
      ]);

      const allMeals = [...manualRes.data, ...suggestedRes.data, ...savedRes.data];

      const total = allMeals.reduce(
        (acc, meal) => {
          const n = parseNutrients(meal.nutrients);
          return {
            calories: acc.calories + n.calories,
            protein: acc.protein + n.protein,
            fat: acc.fat + n.fat,
            carbs: acc.carbs + n.carbs,
          };
        },
        { calories: 0, protein: 0, fat: 0, carbs: 0 }
      );

      setSummary(total);
    } catch (err) {
      console.error("❌ Error calculating daily summary:", err.message);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Daily Nutrition Summary
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-yellow-400">
          <p className="text-gray-700 text-sm font-medium">Calories</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {summary.calories.toFixed(2)} kcal
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500">
          <p className="text-gray-700 text-sm font-medium">Protein</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {summary.protein.toFixed(2)} g
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-red-500">
          <p className="text-gray-700 text-sm font-medium">Fat</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {summary.fat.toFixed(2)} g
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
          <p className="text-gray-700 text-sm font-medium">Carbs</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {summary.carbs.toFixed(2)} g
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;
