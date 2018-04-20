var express = require('express');
var router = express.Router();
var userServices = require('../services/users');
var isAdmin = require('../config/roles');
var _ = require('lodash');

/* GET login listing. */
router.get('/', function(req, res, next) {
  if(_.isUndefined(req.session.usr)) {
    res.render('login');
  } else {
    res.redirect('/dashboard');
  }
});

router.post('/', function(req, res, next) {
  var pass = req.body.userPassword;
  try {
    userServices.getUser(req.body.userName).done(user => {
      if(!_.isNil(user)) {
        if(user.get('userPassword') === pass) {
          req.session.userId = user.get('id');
          req.session.userName = user.get('userName');
          req.session.userRole = user.get('userRole');
          res.json({
            success: true,
            message: 'Log in',
            user: { userName: req.session.userName, userRole:  isAdmin(user.get('userRole')) }
          });
        } else {
          res.json({
           success: false,
           message: 'wrong password!'
          });
        }
      } else {
        res.json({
         success: false,
         message: 'not found!'
        });
     }
    });

} catch (e) {
    res.status(500).json({
      success: false,
      error: e
    });
  }
});

module.exports = router;
