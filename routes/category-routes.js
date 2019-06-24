const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Category = require('../models/category-model');
const Recipe = require('../models/recipe-model'); // <== !!!


// POST route => to create a new category
router.post('/categorys', (req, res, next)=>{
 
  Category.create({
    title: req.body.title,
    description: req.body.description,
    recipes: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get all the categorys
router.get('/categorys', (req, res, next) => {
  Category.find().populate('recipes')
    .then(allTheCategorys => {
      res.json(allTheCategorys);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get a specific category/detailed view
router.get('/categorys/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our categorys have array of recipes' ids and 
  // we can use .populate() method to get the whole recipe objects
  //                                   ^
  //                                   |
  //                                   |
  Category.findById(req.params.id).populate('recipes')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific category
router.put('/categorys/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Category.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Category with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific category
router.delete('/categorys/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Category.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Category with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})

module.exports = router;