import React from "react";

const SummaryCard = ({ total }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Daily Summary</h2>
      <p>Calories: {total.calories}</p>
      <p>Protein: {total.protein}</p>
      <p>Carbs: {total.carbs}</p>
      <p>Fat: {total.fat}</p>
    </div>
  );
};

export default SummaryCard;
