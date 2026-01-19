import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:4090";

const Calculator = ({ property }) => {
  const [area, setArea] = useState(1000);
  const [cost, setCost] = useState(property.costPerSqInch * 1000);

  const handleChange = (value) => {
    const newArea = parseFloat(value) || 0;
    setArea(newArea);
    setCost(property.costPerSqInch * newArea);
  };

  return (
    <div className="bg-gray-900/70 rounded-xl shadow-xl p-8 border border-gray-800">
      <h2 className="text-3xl font-bold text-white mb-4">
        Property Cost Calculator
      </h2>
      <p className="text-gray-400 mb-6">Project: {property.name}</p>

      <div className="space-y-4">
        <label className="block font-medium text-gray-300">Enter Area (sq. ft.)</label>
        <input
          type="number"
          value={area}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mt-6 bg-gray-800/80 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-2">Total Cost:</h3>
        <p className="text-3xl font-bold text-green-400">
          ₹{cost.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Calculator;
