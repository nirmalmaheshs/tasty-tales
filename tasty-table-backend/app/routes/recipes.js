const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new recipe
router.post('/', async (req, res) => {
  const { title, description, ingredients, instructions } = req.body;

  try {
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
    });

    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single recipe
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// Update a recipe
router.patch('/:id', getRecipe, async (req, res) => {
  if (req.body.title != null) {
    res.recipe.title = req.body.title;
  }
  if (req.body.description != null) {
    res.recipe.description = req.body.description;
  }
  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }
  if (req.body.instructions != null) {
    res.recipe.instructions = req.body.instructions;
  }

  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a recipe
router.delete('/:id', getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a single recipe by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;
