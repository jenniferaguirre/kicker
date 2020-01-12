module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    howto: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Jiu Jitsu"
    }
  });
return Activity;

  // Post.associate = function(models) {
   
  //   Post.belongsTo(models.Activity, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  // return Post;
};
