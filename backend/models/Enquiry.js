const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    enquiry: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?\d{10,15}$/, "Invalid phone number"],
    },
  },
  { timestamps: true }
);

// const Enquiry = mongoose.model("Enquiry", enquirySchema);
module.exports = mongoose.model("Enquiry", EnquirySchema);
