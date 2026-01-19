import React, { useState } from "react";

const API_URL = "http://localhost:4090";

const EnquiryForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${API_URL}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      setSubmitted(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (submitted)
    return (
      <div className="text-center text-green-400 text-lg py-20">
        Thank you! Your enquiry has been submitted.
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-gray-900/70 rounded-xl shadow-lg p-8 border border-gray-800"
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Enquiry Form
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {["name", "email", "phone", "enquiry"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block font-medium text-gray-300 capitalize mb-2">
            {field}
          </label>
          {field === "enquiry" ? (
            <textarea
              name={field}
              rows="4"
              value={form[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 font-medium transition transform hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
};

export default EnquiryForm;
