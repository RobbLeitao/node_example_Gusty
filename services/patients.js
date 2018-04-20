const db = require('../models/index');

var patientServices = {
  getOne: function(id) {
    try {
      return db.Patient.findOne({
        where: {
          id: id,
          deleted: false
        }
      });
    } catch (e) {
      return { error: e.message };
    }
  },
  save: function(fullName, address, telephone, patientFile, healthInsurance) {
    return db.Patient.create({
      fullName: fullName,
      address: address,
      telephone: telephone,
      patientFile: patientFile,
      healthInsuranceId: healthInsurance
    });
  },
  getAll: function() {
    try {
      console.log('service pacients: ' + db.Patient.toString());
      return db.Patient.findAll({
        include:  [db.Appointment],
        where: {
          deleted: false
        }
      });
    } catch (e) {
      console.log(e.message);
      return { error: e.message };
    }
  },
  update: function(id, fullName, address, telephone, patientFile, healthInsurance) {
    try {
      return db.Patient.update({
        fullName: fullName,
        address: address,
        telephone: telephone,
        patientFile: patientFile,
        healthInsuranceId: healthInsurance
      },
      {
        where: { id: id, deleted: false }
      });
    } catch (e) {
      return { error: e.message };
    }
  },
  delete: function(id) {
    try {
      return db.Patient.update({
        deleted: 1
      },
      {
        where: { id: id }
      });
    } catch (e) {
      return { error: e.message };
    }
  }
};

module.exports = patientServices;
