var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var usrName = req.session.usrName;
  res.render('dashboard');
});


module.exports = router;
