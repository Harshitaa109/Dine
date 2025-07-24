import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ user }) => {
  const [manualMeals, setManualMeals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    nutrients: "",
  });

  // Get the most current user name from localStorage or fallback
  const username = user?.name || JSON.parse(localStorage.getItem("user"))?.name;

  const fetchManualMeals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/manual-meals");
      setManualMeals(response.data);
    } catch (err) {
      console.error("Error fetching manual meals:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchManualMeals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/manual-meals", formData);
      fetchManualMeals();
      setFormData({ name: "", ingredients: "", nutrients: "" });
    } catch (err) {
      console.error("Error adding meal:", err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/manual-meals/${id}`);
      fetchManualMeals();
    } catch (err) {
      console.error("Error deleting meal:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12 relative">
      {/* Greeting in top-right corner */}
      <div className="absolute top-4 right-6 text-gray-700 font-semibold text-lg">
        Hi {username} 👋
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            DineBoard – Your Personal Meal Planner
          </h1>
          <p className="mt-2 text-gray-500 text-lg">
            Log your meals, track nutrients, and stay healthy with ease.
          </p>
        </header>

        {/* Form Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add a New Meal
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Meal Name"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Ingredients"
              className="w-full border border-gray-300 rounded p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Nutrients (e.g. Protein: 10g, Fat: 5g)"
              className="w-full border border-gray-300 rounded p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.nutrients}
              onChange={(e) =>
                setFormData({ ...formData, nutrients: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition"
            >
              Save Meal
            </button>
          </form>
        </section>

        {/* Meals Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Saved Meals
          </h2>
          {manualMeals.length === 0 ? (
            <p className="text-gray-500">No meals saved yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {manualMeals.map((meal) => (
                <div
                  key={meal._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {meal.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Ingredients:</strong> {meal.ingredients}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Nutrients:</strong> {meal.nutrients}
                  </p>
                  <button
                    className="mt-2 text-sm text-red-600 font-medium hover:underline"
                    onClick={() => handleDelete(meal._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
