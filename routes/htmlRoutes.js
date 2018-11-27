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

  // Load Dashboard page
  app.get("/dashboard", function (req, res) {
      db.Musician.findAll({}).then(function (dbMusicians) {
    res.render("dashboard", {
      musicians: dbMusicians
    })
  });
});

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
