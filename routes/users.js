var express = require('express');
var router = express.Router();
var roleServices = require('../services/roles');
var userServices = require('../services/users');
var _ = require('lodash');

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    userServices.getAll().done(users => {
      if(!_.isNil(users)) {
        var _users = [];
        for (var i = 0 ; i < users.length ; i++ ) {
          _users.push(users[i].get());
        }
        res.render('users', {users: _users});
      }
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'error'
    });
  }
});

router.get('/register', function(req, res, next) {
  try {
    roleServices.getAll().done(roles => {
      if(!_.isNil(roles)) {
        var _roles = [];
        for (var i = 0 ; i < roles.length ; i++ ) {
          _roles.push(roles[i].get());
        }
        res.render('register', { roles: _roles, exists: false });
      } else {
        res.status(500).json({
          success: false,
          message: 'no existen roles'
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'no se puede acceder a los roles: '
    });
  }
});

router.get('/edit/:id', function(req, res, next) {

  try {
    roleServices.getAll().done(roles => {
      if(!_.isNil(roles)) {
        var _roles = [];
        for (var i = 0 ; i < roles.length ; i++ ) {
          _roles.push(roles[i].get());
        }
        try {
          userServices.getOne(req.params.id).done(user => {
            if(user !== null && typeof user !== 'undefined') {
              _user = user.get();
              res.render('register', {
                roles: _roles,
                id: _user.id,
                userName: _user.userName,
                userEmail: _user.userEmail,
                fullName: _user.fullName,
                userRole: _user.userRole,
                exists: true,
              });
            } else {
              res.status(500).json({
                success: false,
                message: 'error'
              });
            }
          });

        } catch (e) {
          res.status(500).json({
            success: false,
            message: 'error'
          });
        }
      } else {;
        res.status(500).json({
          success: false,
          message: 'no existen roles'
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'no se puede acceder a los roles'
    });
  }
});

router.get('/password-change', function(req, res, next) {

});

router.post('/', function(req, res, next) {
  try {
    userServices.save(
      req.body.userName,
      req.body.userPassword,
      req.body.userEmail,
      req.body.fullName,
      req.body.userRole
    ).done(function() {
      res.status(201).json({
        success: true,
        message: 'se ha registrado un usuario con éxito'
      });
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'no se ha podido registrar al usuario'
    });
  }
});

router.put('/:id', function(req, res, next) {
  try {
    userServices.update(
      req.params.id,
      req.body.userName,
      req.body.userPassword,
      req.body.userEmail,
      req.body.fullName,
      req.body.userRole
    ).done(function() {
      res.json({
        success: true,
        message: 'se ha actualizado un usuario con éxito'
      });
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'no se ha podido actualizar al usuario'
    });
  }
});

router.delete('/:id', function(req, res, next) {
  try {
    userServices.delete(req.params.id).done(function() {
      res.json({
        success: true,
        message: 'se ha eliminado un usuario con éxito'
      });
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'no se ha podido eliminar al usuario'
    });
  }
});

module.exports = router;
