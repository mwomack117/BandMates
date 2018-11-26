var db = require("../models");

module.exports = function(app) {
  // Get all Musicians/users
  app.get("/api/musicians", function(req, res) {
    db.Musician.findAll({}).then(function(dbMusician) {
      res.json(dbMusician);
    });
  });

  // Get all solo artists
  app.get("/api/musicians/solo", function(req, res) {
    db.Musician.findAll({
      where: {
        soloOrBand: false
      }
    }).then(function(soloData) {
      res.json(soloData);
    });
  });

  // Get all bands
  app.get("/api/musicians/bands", function(req, res) {
    db.Musician.findAll({
      where: {
        soloOrBand: true
      }
    }).then(function(bandData) {
      res.json(bandData);
    });
  });

  // Search by genre
  app.get("/api/musicians/:type/:term", function(req, res) {
    var term = req.params.term
    var type = req.params.type
    if (type === "genre") {
      db.Musician.findAll({
        where: {
          genre: term
        }
      }).then(function(data) {
        if (data.length === 0) {
          res.send("No genre you speak of in our database")
        }
        res.json(data);
      });
    }

    // Search by instrument
    if (type === "instrument") {
      db.Musician.findAll({
        where: {
          instrument: term
        }
      }).then(function(data) {
        if (data.length === 0) {
          res.send("No instrument you speak of in our database")
        }
        res.json(data);
      });
    }
    
  });

  // Post route for saving new musician
  app.post("/api/musicians", function(req, res) {
    db.Musician.create({
      name: req.body.name,
      soloOrBand: req.body.soloOrBand,
      instrument: req.body.instrument,
      genre: req.body.genre,
      yearsExp: req.body.yearsExp,
      bio: req.body.bio
    }).then(function(data) {
      res.json(data);
    });
  });


  
};
