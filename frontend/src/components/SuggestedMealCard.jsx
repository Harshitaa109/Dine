import React from "react";

const SuggestedMealCard = ({ meal, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold">{meal.name}</h2>
      <div className="mt-2">
        <h3 className="font-semibold">Ingredients:</h3>
        <ul className="list-disc list-inside">
          {meal.ingredients.map((ing, idx) => (
            <li key={idx}>
              {ing.name} – {ing.quantity} {ing.unit}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">Nutrition:</h3>
        <p>Calories: {meal.nutrition.calories}</p>
        <p>Protein: {meal.nutrition.protein}</p>
        <p>Carbs: {meal.nutrition.carbs}</p>
        <p>Fat: {meal.nutrition.fat}</p>
      </div>
      {meal.recipe && (
        <div className="mt-2">
          <h3 className="font-semibold">Recipe:</h3>
          <p>{meal.recipe}</p>
        </div>
      )}
      <button
        onClick={() => onDelete(meal._id)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default SuggestedMealCard;
