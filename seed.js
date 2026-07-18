// Import Mongoose and the Recipe model
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
require("dotenv").config();

// A list of sample recipes to insert into the database
const sampleRecipes = [
    {
        title: "Greek Salad",
        image: "/images/recipes/greek-salad.jpg",
        description:
            "Classic Mediterranean salad with fresh vegetables and feta",
        category: "Salads",
        cookingTime: 15,
        difficulty: "Easy",
        servings: 2,
        ingredients: [
            { name: "Tomatoes", amount: "3 pcs" },
            { name: "Cucumber", amount: "1 pc" },
            { name: "Red onion", amount: "1/2 pc" },
            { name: "Feta cheese", amount: "100g" },
            { name: "Olives", amount: "10 pcs" },
        ],
        instructions: [
            "Chop vegetables",
            "Add feta and olives",
            "Drizzle with olive oil and oregano",
        ],
    },
    {
        title: "Pasta Carbonara",
        image: "/images/recipes/pasta-carbonara.jpg",
        description: "Classic Italian pasta dish with egg and bacon",
        category: "Main Dishes",
        cookingTime: 30,
        difficulty: "Medium",
        servings: 2,
        ingredients: [
            { name: "Spaghetti", amount: "200g" },
            { name: "Bacon", amount: "100g" },
            { name: "Eggs", amount: "2 pcs" },
            { name: "Parmesan", amount: "50g" },
            { name: "Black pepper", amount: "to taste" },
        ],
        instructions: [
            "Boil pasta",
            "Fry bacon until crispy",
            "Mix eggs and parmesan",
            "Combine everything off the heat",
        ],
    },
    {
        title: "Chocolate Cake",
        image: "/images/recipes/chocolate-cake.jpg",
        description: "Rich and moist chocolate cake",
        category: "Desserts",
        cookingTime: 80,
        difficulty: "Hard",
        servings: 8,
        ingredients: [
            { name: "Flour", amount: "300g" },
            { name: "Sugar", amount: "200g" },
            { name: "Cocoa powder", amount: "50g" },
            { name: "Eggs", amount: "3 pcs" },
            { name: "Butter", amount: "150g" },
        ],
        instructions: [
            "Mix dry ingredients",
            "Add eggs and melted butter",
            "Bake at 180°C for 40 minutes",
        ],
    },
    {
        title: "Chicken Soup",
        image: "/images/recipes/chicken-soup.jpg",
        description: "Comforting homemade chicken soup",
        category: "Soups",
        cookingTime: 40,
        difficulty: "Easy",
        servings: 4,
        ingredients: [
            { name: "Chicken breast", amount: "300g" },
            { name: "Carrots", amount: "2 pcs" },
            { name: "Onion", amount: "1 pc" },
            { name: "Noodles", amount: "100g" },
        ],
        instructions: [
            "Boil chicken",
            "Add chopped vegetables",
            "Add noodles and simmer for 10 minutes",
        ],
    },
    {
        title: "Pancakes",
        image: "/images/recipes/pancakes.jpg",
        description: "Fluffy breakfast pancakes",
        category: "Breakfast",
        cookingTime: 20,
        difficulty: "Easy",
        servings: 3,
        ingredients: [
            { name: "Flour", amount: "200g" },
            { name: "Milk", amount: "250ml" },
            { name: "Eggs", amount: "2 pcs" },
            { name: "Sugar", amount: "2 tbsp" },
            { name: "Baking powder", amount: "1 tsp" },
        ],
        instructions: [
            "Mix all ingredients into a batter",
            "Cook on a hot pan until bubbles form",
            "Flip and cook the other side",
        ],
    },
    {
        title: "Vegetable Stir Fry",
        image: "/images/recipes/vegetable-stir-fry.jpg",
        description: "Quick and healthy vegetable stir fry",
        category: "Vegetarian",
        cookingTime: 25,
        difficulty: "Easy",
        servings: 2,
        ingredients: [
            { name: "Broccoli", amount: "1 head" },
            { name: "Bell pepper", amount: "1 pc" },
            { name: "Carrots", amount: "2 pcs" },
            { name: "Soy sauce", amount: "3 tbsp" },
            { name: "Garlic", amount: "2 cloves" },
        ],
        instructions: [
            "Chop all vegetables",
            "Stir fry garlic first",
            "Add vegetables and soy sauce, cook until tender-crisp",
        ],
    },
    {
        title: "Beef Burger",
        image: "/images/recipes/beef-burger.jpg",
        description: "Classic homemade beef burger",
        category: "Main Dishes",
        cookingTime: 30,
        difficulty: "Medium",
        servings: 2,
        ingredients: [
            { name: "Ground beef", amount: "300g" },
            { name: "Burger buns", amount: "2 pcs" },
            { name: "Cheese slices", amount: "2 pcs" },
            { name: "Lettuce", amount: "2 leaves" },
            { name: "Tomato", amount: "1 pc" },
        ],
        instructions: [
            "Form beef patties",
            "Grill patties on both sides",
            "Assemble burger with toppings",
        ],
    },
    {
        title: "Tomato Soup",
        image: "/images/recipes/tomato-soup.jpg",
        description: "Smooth and comforting tomato soup",
        category: "Soups",
        cookingTime: 30,
        difficulty: "Easy",
        servings: 4,
        ingredients: [
            { name: "Tomatoes", amount: "6 pcs" },
            { name: "Onion", amount: "1 pc" },
            { name: "Garlic", amount: "2 cloves" },
            { name: "Vegetable broth", amount: "500ml" },
            { name: "Cream", amount: "50ml" },
        ],
        instructions: [
            "Saute onion and garlic",
            "Add tomatoes and broth, simmer 20 minutes",
            "Blend until smooth and stir in cream",
        ],
    },
    {
        title: "Banana Smoothie",
        image: "/images/recipes/banana-smoothie.jpg",
        description: "Quick and healthy breakfast smoothie",
        category: "Beverages",
        cookingTime: 5,
        difficulty: "Easy",
        servings: 1,
        ingredients: [
            { name: "Banana", amount: "1 pc" },
            { name: "Milk", amount: "200ml" },
            { name: "Honey", amount: "1 tbsp" },
            { name: "Ice cubes", amount: "4 pcs" },
        ],
        instructions: [
            "Add all ingredients to a blender",
            "Blend until smooth",
        ],
    },
    {
        title: "Apple Pie",
        image: "/images/recipes/apple-pie.jpg",
        description: "Traditional homemade apple pie",
        category: "Desserts",
        cookingTime: 90,
        difficulty: "Hard",
        servings: 8,
        ingredients: [
            { name: "Apples", amount: "6 pcs" },
            { name: "Flour", amount: "350g" },
            { name: "Butter", amount: "200g" },
            { name: "Sugar", amount: "150g" },
            { name: "Cinnamon", amount: "1 tsp" },
        ],
        instructions: [
            "Make the pie dough and chill it",
            "Prepare apple filling with sugar and cinnamon",
            "Assemble and bake at 190°C for 50 minutes",
        ],
    },
];

// Connect, insert the data, then disconnect
async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        await Recipe.deleteMany(); // clear existing recipes first, to avoid duplicates on re-run
        await Recipe.insertMany(sampleRecipes); // insert all sample recipes at once

        console.log(
            `${sampleRecipes.length} sample recipes added successfully`,
        );
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        await mongoose.disconnect();
    }
}

seedDatabase();
