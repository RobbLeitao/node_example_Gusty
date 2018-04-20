const db = require('../models/index');

var healthInsuranceServices = {
  getOne: function(id) {
    try {
      return db.HealthInsurance.findOne({
        attributes: ['id', 'fullName', 'address', 'telephone'],
        where: {
          id: id,
          deleted: false
        }
      });
    } catch (e) {
        return { error: e.message };
    }
  },
  getAll: function() {
    try {
      return db.HealthInsurance.findAll({
        attributes: ['id', 'fullName', 'address', 'telephone'],
        where: {
          deleted: false
        }
      });
    } catch (e) {
        return { error: e.message };
    }
  },
  save: function(fullName, address, telephone) {
    try {
      return db.HealthInsurance.create({
        fullName: fullName,
        address: address,
        telephone: telephone
      });
    } catch (e) {
        return { error: e.message };
    }
  },
  update: function(id, fullName, address, telephone) {
    try {
      return db.HealthInsurance.update({
        fullName: fullName,
        address: address,
        telephone: telephone
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
      return db.HealthInsurance.update({
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

module.exports = healthInsuranceServices;
