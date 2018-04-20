const Sequelize = require('sequelize');
const sequelize = require('../config/database-connection-config');
const HealthInsurance = require('./health-insurance');
const Appointment = require('./appointment');

module.exports = function(sequelize, DataTypes) {
const Patient = sequelize.define('Patient', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
    fullName: Sequelize.STRING,
    telephone: Sequelize.STRING,
    healthInsuranceId: Sequelize.INTEGER,
    address: Sequelize.STRING,
    patientFile: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    tableName: 'patients'
  });

  Patient.associate = function (models) {
    Patient.hasMany(models.Appointment);
  }

  return Patient;
};
