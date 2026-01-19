import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

const InvestmentAnalysis = ({ propertyPrice, location }) => {
  const [growthRate, setGrowthRate] = useState(6);
  const [years, setYears] = useState(5);
  const futureValue =
    propertyPrice * Math.pow(1 + growthRate / 100, years);

  return (
    <div className="bg-gray-900/70 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-green-400 w-6 h-6" />
        <h3 className="text-2xl font-bold text-white">Investment Analysis</h3>
      </div>

      <p className="text-gray-400 mb-4">Location: {location}</p>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2 text-gray-300">
            Expected Annual Growth Rate (%)
          </label>
          <input
            type="number"
            value={growthRate}
            onChange={(e) => setGrowthRate(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-300">
            Investment Duration (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200"
          />
        </div>

        <div className="mt-6 bg-gray-800/80 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-2">
            Future Property Value:
          </h3>
          <p className="text-3xl font-bold text-green-400">
            ₹{futureValue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAnalysis;
