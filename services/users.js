const db = require('../models/index');

var userServices = {
  getUser: function(name) {
    try {
      return db.User.findOne({
        attributes: ['id', 'userEmail', 'userPassword', ['userRoleId','userRole']],
        where: {
          userName: name,
          deleted: false
        }
      });
    } catch (e) {
      return { error: e.message };
    }
  },
  getOne: function(id) {
    try {
      return db.User.findOne({
        where: {
          id: id,
          deleted: false
        }
      });
    } catch (e) {
      return 'error';
    }
  },
  save: function(userName, password, email, fullName, role) {
    try {
      return db.User.create({
        userName: userName,
        userPassword: password,
        userEmail: email,
        fullName: fullName,
        userRoleId: role
      });
    } catch (e) {
      return { error: e.message };
    }
  },
  getAll: function() {
    try {
      return db.User.findAll({
        where: {
          deleted: false
        }
      });
    } catch (e) {
      return { error: e.message };
    }
  },
  update: function(id, userName, password, email, fullName, role) {
    try {
      return db.User.update({
        userName: userName,
        userPassword: password,
        userEmail: email,
        fullName: fullName,
        userRoleId: role
      },
      {
        where: {id: id, deleted: false}
      });
    } catch(e) {
      return { error: e.message };
    }
  },
  delete: function(id) {
    try {
      return db.User.update({
        deleted: 1
      },
      {
        where: { id: id }
      });
    } catch(e) {
      return { error: e.message };
    }
  }
};

module.exports = userServices;
