const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const menuSchema = new Schema({
    lunes: { 
        type: Object,
        breakfast: {type: Schema.Types.ObjectId, ref: 'Recipe'},
        lunch: {type: Schema.Types.ObjectId, ref: 'Recipe'},
        dinner: {type: Schema.Types.ObjectId, ref: 'Recipe'}
        },
  
  });

  const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
