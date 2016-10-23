/**
 * Dream Model.
 *
 * @author taylorrf
 * @version 1.0
 */

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dream = sequelize.define('Dream', {
    category: DataTypes.STRING,
    subcategory: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Dream.hasMany(models.Layer, {foreignKey: 'dream_id'});
        Dream.belongsTo(models.User, {foreignKey: 'user_id'});
      }
    }
  });
  return Dream;
};
