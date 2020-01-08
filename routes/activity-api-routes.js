var db = require("../models");

module.exports = function(app) {
  app.get("/api/activities", function(req, res) {
  
    
    db.dbActivity.findAll({
      include: [db.Post]
    }).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

  app.get("/api/activities/:id", function(req, res) {



    db.Activity.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

  app.post("/api/activities", function(req, res) {
    db.Activity.create(req.body).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

  app.delete("/api/activities/:id", function(req, res) {
    db.Activity.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

};
