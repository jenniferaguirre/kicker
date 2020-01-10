
var db = require("../models");


module.exports = function(app) {


  app.get("/api/activities", function(req, res) {
   
    db.Todo.findAll({}).then(function(dbTodo) {
    
      res.json(dbActivity);
    });
  });


  app.post("/api/activities", function(req, res) {
 
    db.dbActivity.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbActivity) {
      
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

  
  app.put("/api/activities", function(req, res) {

    db.Activity.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

};
