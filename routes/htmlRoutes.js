var db = require("../models");

module.exports = function (app) {
  // Load Landing page
  app.get("/", function (req, res) {
    res.render("landing")
  });

  // Load Contact page
  app.get("/contact", function (req, res) {
    res.render("contact")
  });

  // Load Index page
  app.get("/index", function (req, res) {
    // db.Example.findAll({}).then(function (dbExamples) {
    res.render("index", {
      msg: "Welcome!",
      // examples: dbExamples
    });
  });

  // Load Contact page
  app.get("/", function (req, res) {
    res.render("contact")
  });

  // Load Dashboard page
  app.get("/dashboard", function (req, res) {
      db.Musician.findAll({}).then(function (dbMusicians) {
    res.render("dashboard", {
      musicians: dbMusicians
    })
  });
});


  // Load Search results on dashboard page 
  app.get("/dashboard/:type/:term", function (req, res) {
    db.Musician.findAll({
      where: { id: req.params.id } }).then(function (results) {
      res.render("dashboard", {
      Musicians: results
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
