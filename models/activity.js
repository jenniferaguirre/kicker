module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Activity", {

    name: DataTypes.STRING
  });

  Activity.associate = function(models) {
    
    Activity.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Activity;
};
