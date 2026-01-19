import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Property from './models/property.js';
import User from './models/user.js';
import Enquiry from './models/enquiry.js';

const app = express();  // Now works after imports

const mongo_url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wellax";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
async function main() {
  await mongoose.connect(mongo_url);
}
main()
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.log(`❌ DB error: ${err}`));

// Root API
app.get("/", (req, res) => {
  res.json({ message: "Wellax Reality API" });
});

// ================= AUTH ROUTES ================= //
app.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/auth/google", async (req, res) => {
  const { name, email, googleId } = req.body;
  try {
    let user = await User.findOne({ googleId });
    if (user) {
      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      });
    } else {
      user = new User({ name, email, googleId });
      await user.save();
      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// ================= PROPERTY ROUTES ================= //
app.get("/api/projects", async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/projects/:name", async (req, res) => {
  try {
    const property = await Property.findOne({ name: req.params.name });
    if (!property)
      return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/property/:id/calculator", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ error: "Property not found" });
    res.json({ property });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ENQUIRY ROUTE ================= //
app.post("/enquiries", async (req, res) => {
  try {
    const { name, enquiry, email, phone } = req.body;

    if (!name || !enquiry || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEnquiry = new Enquiry({ name, enquiry, email, phone });
    await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry saved successfully!",
    });
  } catch (err) {
    console.error("Error saving enquiry:", err);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
});
// Get all enquiries
app.get("/enquire/all", async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 }); // newest first
    res.json(enquiries);
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ================= SERVER START ================= //
const PORT = process.env.PORT || 4090;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



