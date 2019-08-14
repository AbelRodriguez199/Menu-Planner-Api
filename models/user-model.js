 /*const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');
 const SALT_WORK_FACTOR = 10;
 const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
 const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
 const URL_PATTERN = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
 
 const userSchema = new mongoose.Schema({
   email: {
     type: String,
     required: 'Un Email es necesario',
     unique: true,
     lowercase: true,
     trim: true,
     match: [EMAIL_PATTERN, 'Formato de email no válido']
   },
   password: {
     type: String,
     required: 'Una contraseña es necesaria',
     match: [PASSWORD_PATTERN, 'La contraseña debe contener al menos 6 caracteres, incluyendo mayúscula,minúscula y numeros.']
   },
  
   avatarURL: {
     type: String,
     match: [URL_PATTERN, 'Formato de Avatar inválido']
   }
 }, {
   timestamps: true,
   toJSON: {
     transform: (doc, ret) => {
       ret.id = doc._id;
       delete ret._id;
       delete ret.__v;
       delete ret.password;
       return ret;
     }
   }
 });
 
 userSchema.pre('save', function (next) {
   const user = this;
 
   if (!user.isModified('password')) {
     next();
   } else {
     bcrypt.genSalt(SALT_WORK_FACTOR)
       .then(salt => {
         return bcrypt.hash(user.password, salt)
           .then(hash => {
             user.password = hash;
             next();
           })
       })
       .catch(next)
   }
 });
 
 userSchema.methods.checkPassword = function (password) {
   return bcrypt.compare(password, this.password);
 }
 
 const User = mongoose.model('User', userSchema);
 module.exports = User;
 */