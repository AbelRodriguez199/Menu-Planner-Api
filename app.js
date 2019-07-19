require('dotenv').config();

const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const createError  = require('http-errors')
 const session       = require('express-session');
 const passport      = require('passport');

 require('./configs/db.config')
require('./configs/passport');
const cors  = require('./configs/cors.config');
//const session = require('./configs/session.config')

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
    


app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// ADD SESSION SETTINGS HERE:
app.use(session);

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());



// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:

app.use(cors);

// ROUTES MIDDLEWARE STARTS HERE:
const authRouter = require('./routes/auth-routes')
app.use('/api', authRouter);
app.use('/api', require('./routes/category-routes'));
app.use('/api', require('./routes/recipe-routes'));
app.use('/api', require('./routes/ingredient-routes'));
app.use('/api', require('./routes/menu-routes'));
const index = require('./routes/index');
app.use('/', index);

app.use((req, res, next) => {
  next(createError(404))
})

app.use((error, req, res, next) => {
  console.error(error);  
  res.status(error.status || 500);
  const data = {};

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    for (field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message
    }
    data.errors = error.errors
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found')
  }


  data.message = error.message
  res.json(data);
})


module.exports = app;