module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });
  return Activity;
};
