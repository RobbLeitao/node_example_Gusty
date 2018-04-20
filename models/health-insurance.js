const Sequelize = require('sequelize');
const sequelize = require('../config/database-connection-config');

module.exports = function(sequelize, DataTypes) {
  const HealthInsurance = sequelize.define('HealthInsurance', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    fullName: Sequelize.STRING,
    telephone: Sequelize.STRING,
    address: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
  },
  {
    tableName: 'health-insurances'
  });

  return HealthInsurance;
};
