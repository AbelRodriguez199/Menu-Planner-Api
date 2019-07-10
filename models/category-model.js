const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const categorySchema = new Schema({
  title: String,
  description: String,
  recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
  
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;