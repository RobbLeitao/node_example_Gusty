const db = require('../models');

var appointmentServices = {
  getOne: function(id) {
    try {
      console.log('test');
      return db.Appointment.findOne({
        attributes: ['id', 'appointmentTime', 'startDate', 'endDate', 'fullName'],
        where: {
          id: id,
          deleted: false
        },
        include: [db.Patient]
      });
    } catch (e) {
        return { error: e.message };
    }
  },
  getAll: function() {
    try {
      return db.Appointment.findAll({
        attributes: ['id', 'appointmentTime', 'startDate', 'endDate'],
        where: {
          deleted: false
        },
        include: [db.Patient]
      });
    } catch (e) {
        return { error: e.message };
    }
  },
  getAllWithPatientFileAndFullName: function() {
    try {
      return db.Appointment.findAll({
        attributes: ['id', 'appointmentTime', 'startDate', 'endDate'],
        where: {
          deleted: false
        },
        include: [
          { model: db.Patient, attributes: ['patientFile'] }]
      });
    } catch (e) {
      console.log(e.toString());
        return { error: e.message };
    }
  },
  save: function(patient, appointmentTime, startDate, endDate) {
    try {
      return db.Appointment.create({
        patientId: patient,
        appointmentTime: appointmentTime,
        startDate: startDate,
        endDate: endDate
      });
    } catch (e) {
        return { error: e.message };
    }
  },
  update: function(id, patient, appointmentTime, startDate, endDate) {
    try {
      return db.Appointment.update({
        patientId: patient,
        appointmentTime: appointmentTime,
        startDate: startDate,
        endDate: endDate
        },
        {
          where: { id: id, deleted: false }
        });
    } catch (e) {
      return { error: e.message }
    }
  },
  delete: function(id) {
    try {
      return db.Appointment.update({
        deleted: 1
      },
      {
        where: { id: id }
      });
    } catch (e) {
      return { error: e.message }
    }
  }
};

module.exports = appointmentServices;
