import React, { useState } from "react";

const API_URL = "http://localhost:5000";

const EnquiryForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.enquiry) {
      return "All fields are required";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Please enter a valid email";
    }
    if (!/^[0-9]{10}$/.test(form.phone)) {
      return "Phone number must be 10 digits";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center bg-green-200/10 border border-green-500/30 rounded-2xl p-10 shadow-xl">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          Enquiry Submitted!
        </h2>
        <p className="text-gray-300">
          Thank you for contacting us. Our team will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        Enquiry Form
      </h2>
      <p className="text-center text-gray-400 mb-8">
        Let us help you find the perfect property
      </p>

      {error && (
        <div className="mb-4 text-center text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg py-2">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="mb-5">
        <label className="block text-gray-300 mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label className="block text-gray-300 mb-2">Phone Number</label>
        <input
          type="text"
          name="phone"
          placeholder="10 digit mobile number"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Enquiry */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Your Enquiry</label>
        <textarea
          name="enquiry"
          rows="4"
          placeholder="I am interested in this property..."
          value={form.enquiry}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition transform hover:scale-[1.02] disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
};

export default EnquiryForm;
