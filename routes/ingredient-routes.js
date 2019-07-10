// cambiar category por recipe y recipe por ingredient

const express = require('express');
const mongoose = require('mongoose');
const Recipe= require('../models/ingredient-model');
const Category = require('../models/recipe-model');

const router  = express.Router();

// GET route => to retrieve a specific ingredient
router.get('/categorys/:categoryId/recipes/:recipeId/ingredients/:ingredientId', (req, res, next) => {
  Ingredient.findById(req.params.ingredientId)
  .then(theIngredient=>{
      res.json(theIngredient);
  })
  .catch( err =>{
      res.json(err);
  })
});

// POST route => to create a new ingredient
router.post('/ingredients', (req, res, next)=>{
  
  Ingredient.create({
      name: req.body.name,
      quantity: req.body.quantity, 
      measure: req.body.measure, 
      recipe: req.body.recipeID
  })
    .then(response => {
      Recipe.findByIdAndUpdate(req.body.recipeID, { $push:{ ingredients: response._id } })
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
      })
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific recipe
router.put('/ingredients/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Ingredient.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Ingredientwith ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific ingredient
router.delete('/categorys/:id/recipes/:id/ingredients/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Ingredient.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Ingredientewith ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;