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
      type: DataTypes.STRING(7000),
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Jiu Jitsu"
    }
  
  });

Activity.sync();
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
