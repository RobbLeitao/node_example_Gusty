const db = require('../models/index');

var roleServices = {
  getAll: function() {
    try {
      return db.Role.findAll({
        attributes: ['id', 'description'],
        where: {
          deleted: false
        }
      });
    } catch (e) {
      return { error: e.message };
    }
  },
  getOne: function(id) {
    try {
      return db.Role.findOne({
        attributes: ['id', 'description'],
        where: {
          id: id,
          deleted: false
        }
      });
    } catch (e) {
      return { error: e.message };
    }
  }
};

module.exports = roleServices;
