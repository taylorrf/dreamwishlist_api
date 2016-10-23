/**
 * Layer Model.
 *
 * @author taylorrf
 * @version 1.0
 */

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Layer = sequelize.define('Layer', {
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    product_id: DataTypes.STRING,
    dream_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Layer.belongsTo(models.Dream, {
          onDelete: "CASCADE",
          foreignKey: {
            name: "dream_id",
            allowNull: false
          }
        });
        Layer.belongsTo(models.User, {foreignKey: 'user_id'});
      }
    }
  });
  return Layer;
};
