module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    act: {
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

  //  Activity.associate = function(models) {
   
  //   Activity.belongsTo(models.Activity, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  // return Post;
};
