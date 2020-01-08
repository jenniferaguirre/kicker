module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Activity", {
    // Giving the Activity model a name of type STRING
    name: DataTypes.STRING
  });

  Activity.associate = function(models) {
    // Associating Activity with Posts
    // When an Activity is deleted, also delete any associated Posts
    Activity.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Activity;
};
