const Sequelize = require('sequelize');
const sequelize = require('../config/database-connection-config');
const Patient = require('./patient');

module.exports = function(sequelize, DataTypes) {
  const Appointment = sequelize.define('Appointment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    patientId: {
      type: Sequelize.INTEGER,
      references: {
        model: Patient,
        key:   "id"
      }
    },
    appointmentTime: Sequelize.TIME,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
  },
  {
    tableName: 'appointments'
  });

  Appointment.associate = function (models) {
    Appointment.belongsTo(models.Patient);
  }

  return Appointment;
};
