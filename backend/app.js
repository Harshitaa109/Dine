const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const manualMealRoutes = require("./routes/manualMealRoutes");
const suggestedMealRoutes = require("./routes/SuggestedMealRoutes");
const savedMealsRoutes = require("./routes/savedMealRoutes");
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json()); // Body parser for JSON

// Health Check
app.get("/", (req, res) => {
  res.send("🍽️ DineBoard Backend is running!");
});

// API Routes
app.use("/api/manual-meals", manualMealRoutes);
app.use("/api/suggested-meals", suggestedMealRoutes);
app.use("/api/saved-meals", savedMealsRoutes);
app.use('/api/users', userRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
