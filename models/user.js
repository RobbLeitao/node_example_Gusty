const Sequelize = require('sequelize');
const sequelize = require('../config/database-connection-config');
const Role = require('./role');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userEmail: Sequelize.STRING,
    userPassword: Sequelize.STRING,
    userName: Sequelize.STRING,
    fullName: Sequelize.STRING,
    userRoleId: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    tableName: 'users'
  });

  User.associate = function (models) {
    User.hasOne(models.Role);
  }

  return User;
};
