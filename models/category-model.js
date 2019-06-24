const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const categorySchema = new Schema({
  title: String,
  description: String,
  recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
  // owner will be added later on
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;