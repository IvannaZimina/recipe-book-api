// Import Express — the framework we use to build the server and define routes
const express = require("express");

// Import CORS — allows our Angular app (running on a different port) to call this API
const cors = require("cors");

// Import Mongoose — lets us connect to MongoDB and define data schemas
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe");

// Import the recipes router
const recipeRoutes = require('./routes/recipes');

// Load environment variables from the .env file into process.env
require("dotenv").config();

// Create the Express application instance
const app = express();

// Use the port from .env, or fall back to 3000 if not defined
const PORT = process.env.PORT || 3000;

// --- Database connection ---

// Connect to MongoDB using the connection string stored in .env
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// --- Middleware ---
// Middleware runs on every incoming request, before it reaches our routes.

// Enable CORS for all routes (so the browser doesn't block requests from Angular)
app.use(cors());

// Parse incoming JSON request bodies (needed later for POST/PUT requests, e.g. creating a recipe)
app.use(express.json());

// --- Routes ---

// A simple "health check" route: visiting http://localhost:3000/ confirms the server is alive
app.get("/", (req, res) => {
    res.send("Recipe Book API is running");
});

// Mount all recipe-related routes under the /api/recipes prefix
app.use("/api/recipes", recipeRoutes);

// --- Start the server ---
// Starts listening for incoming requests on the given port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
