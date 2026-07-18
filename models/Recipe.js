// Import Mongoose to define the schema and model
const mongoose = require("mongoose");

// Define the structure (schema) for a single recipe document
const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String, // just a filename or URL, not the actual image file
        },
        category: {
            type: String,
        },
        cookingTime: {
            type: Number, // stored in minutes, e.g. 30
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"], // only these three values are allowed
        },
        servings: {
            type: Number,
            default: 2,
        },
        ingredients: [
            {
                name: { type: String, required: true },
                amount: { type: String }, // e.g. "200g", "2 pcs"
            },
        ],
        instructions: [
            {
                type: String, // each array item is one step, e.g. "Boil the pasta"
            },
        ],
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt fields
    },
);

// Create the model from the schema — this is what we'll use to query/save recipes
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
