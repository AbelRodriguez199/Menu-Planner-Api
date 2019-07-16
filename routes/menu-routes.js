const express = require('express');
const mongoose = require('mongoose');
const Menu = require('../models/menu-model')
const Recipe= require('../models/recipe-model');
const Category = require('../models/category-model');

const router  = express.Router();
// POST route => tpara crear un nuevo menu
router.post('/menus', (req, res, next)=>{
  
    Menu.create({  
        category: req.body.categoryID,
        recipe: req.body.recipeID
    })
      .then(response => {
        Category.findByIdAndUpdate(req.body.categoryID, { $push:{ recipes: response._id } })
          .then(theResponse => {
              res.json(theResponse);
          })
          .catch(err => {
            res.json(err);
        })
      .then(response => {
          Recipe.findByIdAndUpdate(req.body.recipeID, { $push:{ recipes: response._id } })
          .then(theResponse => {
              res.json(theResponse);
          })
      })
      })
      .catch(err => {
        res.json(err);
      })
  })
// GET route => to get all the categorys
router.get('/menus', (req, res, next) => {
  Category.find().populate('recipes')
    .then(allTheCategorys => {
      res.json(allTheCategorys);
    })
    .catch(err => {
      res.json(err);
    })
});
  module.exports = router;