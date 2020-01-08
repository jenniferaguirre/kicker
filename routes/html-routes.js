
var path = require("path");

// Routes
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });


  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });


  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });


  app.get("/activities", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/activity-manager.html"));
  });

};
