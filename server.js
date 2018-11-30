require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Auth.js 
  //get routes
  app.get('/index', function (req, res) {

      res.render('index');

  });

  app.get('/dashboard', function (req, res) {

      res.render('dashboard');

  });

  app.get('/dashboard', isLoggedIn, function (req, res) {

      res.render('dashboard');
  });

  app.get('/logout', function (req, res) {

      req.session.destroy(function (err) {

          res.redirect('/');

      });
  });
  function isLoggedIn(req, res, next) {

      if (req.isAuthenticated())

          return next();

      res.redirect('/landing');

  }
  //post routes
  app.post('/index', passport.authenticate('local-signup', {
      successRedirect: '/dashboard',

      failureRedirect: '/index'
  }));

  app.post('/landing', passport.authenticate('local-signin', {
      successRedirect: '/dashboard',

      failureRedirect: '/landing'
  }

));



var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Models
var models = require("./models");

//load passport strategies
require('./config/passport.js')(passport, models.musician);
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
