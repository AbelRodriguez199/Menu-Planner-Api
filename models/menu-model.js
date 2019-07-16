const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const menuSchema = new Schema({
  
    semana: {
       type : Date, default:Date.now
    },
    lunes: { 
        breakfast: {type: Schema.Types.ObjectId, ref: 'Recipe'},
        lunch: {type: Schema.Types.ObjectId, ref: 'Recipe'},
        dinner: {type: Schema.Types.ObjectId, ref: 'Recipe'}
          },
    martes: { 
          breakfast: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          lunch: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          dinner: {type: Schema.Types.ObjectId, ref: 'Recipe'}
          },
    miercoles: { 
          breakfast: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          lunch: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          dinner: {type: Schema.Types.ObjectId, ref: 'Recipe'}
          },
    jueves: { 
          breakfast: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          lunch: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          dinner: {type: Schema.Types.ObjectId, ref: 'Recipe'}
          },
    viernes: {   
          breakfast: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          lunch: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          dinner: {type: Schema.Types.ObjectId, ref: 'Recipe'}
          },
    sabado: { 
          breakfast: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          lunch: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          dinner: {type: Schema.Types.ObjectId, ref: 'Recipe'}
          },
    domingo: { 
          breakfast: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          lunch: {type: Schema.Types.ObjectId, ref: 'Recipe'},
          dinner: {type: Schema.Types.ObjectId, ref: 'Recipe'}
          },
  
  });






  
  const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
