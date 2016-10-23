/**
 * User Model.
 *
 * @author taylorrf
 * @version 1.0
 */

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    firebase_key: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Dream, {foreignKey: 'user_id'});
        User.hasMany(models.Layer, {foreignKey: 'user_id'});
      }
    }
  });
  return User;
};
