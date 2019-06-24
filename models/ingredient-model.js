const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const constants = require('../constants')


const ingredientSchema = new Schema({
   name: { 
     type: String, 
     },
    quantity: { 
     type: Number, 
     min: 1, 
     index: true 
     },
    measure: {
    type: String,
    enum: constants.measures
     },
    recipe: {
      type: Schema.Types.ObjectId, ref: 'Recipe'
     }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;