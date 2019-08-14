require('dotenv').config();


const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const createError  = require('http-errors')



// WHEN INTRODUCING USERS DO THIS:
// INSTALL THESE DEPENDENCIES: passport-local, passport, bcryptjs, express-session
// AND UN-COMMENT OUT FOLLOWING LINES:

// const session       = require('express-session');
// const passport      = require('passport');
require('./configs/db.config')
// require('./configs/passport');
// require('./configs/session.config');
const cors  = require('./configs/cors.config');

// IF YOU STILL DIDN'T, GO TO 'configs/passport.js' AND UN-COMMENT OUT THE WHOLE FILE

/*mongoose
  .connect('mongodb://localhost/menu-planner-api', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });*/

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
app.use((req, res, next) => {
  res.locals.session = req.user;
  next();
})

// USE passport.initialize() and passport.session() HERE:


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:

app.use(cors);

// ROUTES MIDDLEWARE STARTS HERE:
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
    data.errors = {}
    Object.keys(error.errors)
      .forEach(field => data.errors[field] = error.errors[field].message)
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(404);
    error.message = 'Resource not found';
  }

  data.message = error.message
  res.json(data);
})


module.exports = app;