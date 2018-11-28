var db = require("../models");

module.exports = function (app) {

  // Post route for saving new musician
  app.post("/api/musicians/all/all/all", function (req, res) {
    db.Musician.create({
      name: req.body.name,
      img: req.body.img,
      soloOrBand: req.body.soloOrBand,
      instrument: req.body.instrument,
      genre: req.body.genre,
      yearsExp: req.body.yearsExp,
      bio: req.body.bio,
      email: req.body.email
    }).then(function (data) {
      res.json(data);
    });
  });

  // --- Search by specifics genre/instruent/band --- //
  app.get("/api/musicians/:genre/:instrument/:soloOrBand", function (req, res) {
    var genre = req.params.genre
    var instrument = req.params.instrument
    var soloOrBand = req.params.soloOrBand

    // All say "all"
    if (genre === "all" && instrument === "all" && soloOrBand === "all") {
      db.Musician.findAll({}).then(function (data) {
        if (data.length === 0) {
          res.send("Nothing found")
        }
        res.json(data);
      });
    }

    // 2 say "all" //
    if (genre !== "all" && instrument === "all" && soloOrBand === "all") {
      // where genre is specific
      db.Musician.findAll({
        where: {
          genre: genre
        }
      }).then(function (data) {
        if (data.length === 0) {
          res.send("No genre you speak of in our database")
        }
        res.json(data);
      });
    }

    if (genre === "all" && instrument !== "all" && soloOrBand === "all") {
      // where instrument is specific
      db.Musician.findAll({
        where: {
          instrument: instrument
        }
      }).then(function (data) {
        if (data.length === 0) {
          res.send("No instrument you speak of in our database")
        }
        res.json(data);
      });
    }

    if (genre === "all" && instrument === "all" && soloOrBand !== "all") {
      // where soloOrBand is specific
      db.Musician.findAll({
        where: {
          soloOrBand: soloOrBand
        }
      }).then(function (data) {
        if (data.length === 0) {
          res.send("No band you speak of in our database")
        }
        res.json(data);
      });
    }

    // 1 say "all"
    if (genre === "all" && instrument !== "all" && soloOrBand !== "all") {
      // where instrument/soloOrBand specific
      db.Musician.findAll({
        where: {
          instrument: instrument,
          soloOrBand: soloOrBand
        }
      }).then(function (data) {
        if (data.length === 0) {
          res.send("where instrument/soloOrBand specific")
        }
        res.json(data);
      });
    }

    if (genre !== "all" && instrument === "all" && soloOrBand !== "all") {
      // where genre/soloOrBand specific
      db.Musician.findAll({
        where: {
          genre: genre,
          soloOrBand: soloOrBand
        }
      }).then(function (data) {
        if (data.length === 0) {
          res.send("where genre/soloOrBand specific")
        }
        res.json(data);
      });
    }

    if (genre !== "all" && instrument !== "all" && soloOrBand === "all") {
      // where genre/instrument specific
      db.Musician.findAll({
        where: {
          genre: genre,
          instrument: instrument
        }
      }).then(function (data) {
        if (data.length === 0) {
          res.send("where genre/instrument specific")
        }
        res.json(data);
      });
    }
  });
  // --- End of search by specifics genre/instruent/band --- //






};
