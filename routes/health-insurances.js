var express = require('express');
var router = express.Router();
var healthInsuranceServices = require('../services/health-insurances');
var _ = require('lodash');

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    healthInsuranceServices.getAll().done(healthInsurances => {
      if(!_.isNil(healthInsurances)) {
        var _healthInsurances = [];
        for (var i = 0 ; i < healthInsurances.length ; i++ ) {
          _healthInsurances.push(healthInsurances[i].get());
        }
        res.render('health-insurances', { healthInsurances: _healthInsurances });
      }
    });
  } catch (e) {
    res.json({
      success: false,
      message: 'error'
    });
  }
});

router.get('/register', function(req, res, next) {
  res.render('register-health-insurance', { exists: false });
});

router.get('/edit/:id', function(req, res, next) {
  try {
    healthInsuranceServices.getOne(req.params.id).done(healthInsurance => {
      if(!_.isNil(healthInsurance)) {
        _healthInsurance = healthInsurance.get();
        res.render('register-health-insurance', {
          id: _healthInsurance.id,
          address: _healthInsurance.address,
          fullName: _healthInsurance.fullName,
          telephone: _healthInsurance.telephone,
          exists: true,
        });
      } else {
        res.json({
          success: false,
          message: 'error'
        });
      }
    });
  } catch (e) {
    res.json({
      success: false,
      message: 'error'
    });
  }
});

router.post('/', function(req, res, next) {
  try {
    healthInsuranceServices.save(
      req.body.fullName,
      req.body.address,
      req.body.telephone
    ).done(function() {
      res.status(201).json({
        success: true,
        message: 'se ha registrado una obra social con éxito'
      });
    });
  } catch (e) {
    res.json({
      success: false,
      message: 'no se ha podido registrar a la obra social'
    });
  }
});

router.put('/:id', function(req, res, next) {
  try {
    healthInsuranceServices.update(
      req.params.id,
      req.body.fullName,
      req.body.address,
      req.body.telephone
    ).done(function() {
      res.json({
        success: true,
        message: 'se ha actualizado una obra social con éxito'
      });
    });
  } catch (e) {
    res.json({
      success: false,
      message: 'no se ha podido actualizar la obra social'
    });
  }
});

router.delete('/:id', function(req, res, next) {
  try {
    healthInsuranceServices.delete(req.params.id).done(function() {
      res.json({
        success: true,
        message: 'se ha eliminado una obra social con éxito'
      });
    });
  } catch (e) {
    res.json({
      success: false,
      message: 'no se ha podido eliminar la obra social'
    });
  }
});

module.exports = router;
