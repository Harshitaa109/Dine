// src/pages/SavedMeals.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const SavedMeals = () => {
  const [suggestedMeals, setSuggestedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSuggestedMeals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/suggested-meals");
      setSuggestedMeals(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch meals. Please try again.");
      console.error("Error fetching suggested meals:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meal?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/suggested-meals/${id}`);
      fetchSuggestedMeals();
    } catch (err) {
      console.error("Error deleting suggested meal:", err.message);
      alert("Failed to delete. Try again.");
    }
  };

  useEffect(() => {
    fetchSuggestedMeals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Saved Suggested Meals
        </h1>

        {loading && <p className="text-gray-600">Loading meals...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && suggestedMeals.length === 0 && (
          <p className="text-gray-500">No saved meals yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedMeals.map((meal) => (
            <div
              key={meal._id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {meal.name || "Unnamed Meal"}
              </h3>

              <div className="mb-2">
                <p className="text-gray-700">
                  <span className="font-medium">Ingredients:</span>{" "}
                  {Array.isArray(meal.ingredients)
                    ? meal.ingredients.join(", ")
                    : meal.ingredients || "N/A"}
                </p>
              </div>

              <button
                onClick={() => handleDelete(meal._id)}
                className="text-red-600 font-semibold text-sm hover:underline mt-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedMeals;
