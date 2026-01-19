import React, { useState } from "react";
import { DollarSign } from "lucide-react";

const bankRates = {
  "State Bank of India": [7.5, 9.65],
  "HDFC Bank": [7.9, 9.4],
  "Bajaj Housing Finance": [7.35, 8.0],
  "ICICI Bank": [7.7, 9.1],
  "Axis Bank": [8.35, 11.9],
  "Canara Bank": [7.4, 11.25],
  "Kotak Mahindra Bank": [7.99, 8.75],
  "Bank of Baroda": [7.45, 10.5],
  "Union Bank of India": [7.45, 10.5],
  "Bank of India": [7.35, 10.75],
  "Indian Overseas Bank": [7.35, 9.55],
  "IDBI Bank": [7.55, 12.25],
  "Punjab National Bank": [7.45, 9.55],
};

const EMICalculator = ({ propertyPrice = 5000000 }) => {
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8);
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [selectedBank, setSelectedBank] = useState("State Bank of India");
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(tenure) * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(P),
    });
  };

  const handleBankChange = (bank) => {
    setSelectedBank(bank);
    const [min, max] = bankRates[bank] || [8.0, 8.5];
    setInterestRate(((min + max) / 2).toFixed(2));
  };

  return (
    <div className="bg-gray-900/70 rounded-lg shadow-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6 text-green-400" />
        <h2 className="text-2xl font-bold text-white">EMI Calculator</h2>
      </div>

      <div className="space-y-4 text-gray-200">
        <div>
          <label className="block font-medium mb-2">Select Bank</label>
          <select
            value={selectedBank}
            onChange={(e) => handleBankChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200"
          >
            {Object.keys(bankRates).map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-400 mt-1">
            Interest Rate Range: {bankRates[selectedBank]?.[0]}% -{" "}
            {bankRates[selectedBank]?.[1]}%
          </p>
        </div>

        <div>
          <label className="block font-medium mb-2">Property Price (₹)</label>
          <input
            type="number"
            value={propertyPrice}
            disabled
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Down Payment (₹)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) =>
              setDownPayment(parseFloat(e.target.value) || 0)
            }
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) =>
              setLoanAmount(parseFloat(e.target.value) || 0)
            }
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Interest Rate (% per annum)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Loan Tenure (Years)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200"
          />
        </div>

        <button
          onClick={calculateEMI}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-indigo-600 text-white rounded-lg hover:from-green-500 hover:to-indigo-500 font-medium transition transform hover:scale-105"
        >
          Calculate EMI
        </button>

        {result && (
          <div className="mt-6 p-6 bg-gradient-to-r from-gray-800 to-indigo-900 rounded-lg border border-gray-700">
            <div className="space-y-3 text-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Monthly EMI:</span>
                <span className="text-2xl font-bold text-green-400">
                  ₹{result.emi.toLocaleString()}
                </span>
              </div>
              <hr className="border-gray-700" />
              <div className="flex justify-between">
                <span className="text-gray-400">Principal Amount:</span>
                <span className="font-semibold">₹{result.principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Interest:</span>
                <span className="font-semibold text-orange-400">
                  ₹{result.totalInterest.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Amount Payable:</span>
                <span className="font-semibold">
                  ₹{result.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
