// Import Express to create a router (a mini, self-contained set of routes)
const express = require("express");
const router = express.Router();

// Import the Recipe model to interact with the recipes collection
const Recipe = require("../models/Recipe");

// GET /api/recipes — return all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/recipes/:id — return a single recipe by its ID
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/recipes — create a new recipe
router.post("/", async (req, res) => {
    const recipe = new Recipe(req.body);
    try {
        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
