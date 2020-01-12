
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/activities/", function(req, res) {
    db.Activity.findAll({})
      .then(function(dbActivity) {
        res.json(dbActivity);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/activities/category/:category", function(req, res) {
    db.Activity.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbActivity) {
        res.json(dbActivity);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/activities/:id", function(req, res) {
    db.Activity.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbActivity) {
        res.json(dbActivity);
      });
  });

  // POST route for saving a new post
  app.post("/api/activities", function(req, res) {
    console.log(req.body);
    db.Activity.create({
      act: req.body.act,
      howto: req.body.howto,
      category: req.body.category
    })
      .then(function(dbActivity) {
        res.json(dbActivity);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/activities/:id", function(req, res) {
    db.Activity.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbActivity) {
        res.json(dbActivity);
      });
  });

  // PUT route for updating posts
  app.put("/api/activities", function(req, res) {
    db.Activity.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbActivity) {
        res.json(dbActivity);
      });
  });
};