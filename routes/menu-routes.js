const express = require('express');
const mongoose = require('mongoose');
const Menu = require('../models/menu-model')
const Recipe= require('../models/recipe-model');
const Category = require('../models/category-model');

const router  = express.Router();
// POST route => para crear un nuevo menu
router.post('/menus', (req, res, next)=>{
    new Menu(req.body).save()
      .then(menu => res.json(menu))
      .catch(err => {
        res.json(err);
      })
  })

router.post('/random-menu', async (req, res, next) => {
  const recipes = await Recipe.find()

  const randomRecipe = () => recipes[Math.floor(Math.random()*recipes.length)]

  const menuData = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
    .reduce((acc, day) => {
      return {
        ...acc,
        [day]: {
          breakfast: randomRecipe(),
          lunch: randomRecipe(),
          dinner: randomRecipe() 
        }
      }
    }, {})
  
    const menu = await new Menu(menuData).save()

    res.json(menu)
})

// GET route => par obtener todos los menus
router.get('/menus', (req, res, next) => {
  const query = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
    .reduce((acc, day) => {
      return acc
        .populate(`${day}.breakfast`)
        .populate(`${day}.lunch`)
        .populate(`${day}.dinner`)
    }, Menu.find())
  
  query
    .then(menus => {
      res.json(menus);
    })
    .catch(err => {
      res.json(err);
    })
});
  module.exports = router;