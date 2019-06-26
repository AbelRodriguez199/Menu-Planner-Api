// ESTA ES LA RUTA ORIGINAL 
/*const express = require('express');
const mongoose = require('mongoose');
const Recipe= require('../models/recipe-model');
const Category = require('../models/category-model');

const router  = express.Router();

// GET route => to retrieve a specific recipes
router.get('/categorys/:categoryId/recipes/:recipeId', (req, res, next) => {
  Recipe.findById(req.params.recipeId)
  .then(theRecipe=>{
      res.json(theRecipe);
  })
  .catch( err =>{
      res.json(err);
  })
});

// POST route => to create a new recipe
router.post('/recipes', (req, res, next)=>{
  
  Recipe.create({
      title: req.body.title,
      description: req.body.description,  
      category: req.body.categoryID
  })
    .then(response => {
      Category.findByIdAndUpdate(req.body.categoryID, { $push:{ recipes: response._id } })
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
router.put('/recipes/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Recipe.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Recipewith ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific recipe
router.delete('/recipes/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Recipe.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Recipewith ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;*/