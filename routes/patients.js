var express = require('express');
var router = express.Router();
var healthInsuranceServices = require('../services/health-insurances');
var patientServices = require('../services/patients');
var _ = require('lodash');

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    patientServices.getAll().done(patients => {
      if(!_.isNil(patients)) {
        var _patients = [];
        for (var i = 0 ; i < patients.length ; i++ ) {
          _patients.push(patients[i].get());
        }
        res.render( 'patients', {patients: _patients});
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
  try {
    healthInsuranceServices.getAll().done(healthInsurances => {
      if(!_.isNil(healthInsurances)) {
        var _healthInsurances=[];
        for (var i = 0 ; i < healthInsurances.length ; i++) {
          _healthInsurances.push(healthInsurances[i].get());
        }
        res.render('register-patient', {
          healthInsurances: _healthInsurances,
          exists:false
        });
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
      message: 'no se puede acceder a los roles'
    });
  }
});

router.get('/edit/:id', function(req, res, next) {

  try {
    healthInsuranceServices.getAll().done(healthInsurances => {
      if(!_.isNil(healthInsurances)) {
        var _healthInsurances = [];
        for (var i = 0 ; i < healthInsurances.length ; i++ ) {
          _healthInsurances.push(healthInsurances[i].get());
        }
        try {
          patientServices.getOne(req.params.id).done(patient => {
            if(!_.isNil(patient)) {
              _patient = patient.get();
              res.render('register-patient', {
                healthInsurances: _healthInsurances,
                id: _patient.id,
                address: _patient.address,
                fullName: _patient.fullName,
                telephone: _patient.telephone,
                patientFile: _patient.patientFile,
                healthInsurance: _patient.healthInsurance,
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
      } else {
        res.json({
          success: false,
          message: 'no existen roles'
        });
      }
    });
  } catch (e) {
    res.json({
      success: false,
      message: 'no se puede acceder a los roles'
    });
  }
});

router.post('/', function(req, res, next) {
  try {
    patientServices.save(
      req.body.fullName,
      req.body.address,
      req.body.telephone,
      req.body.patientFile,
      req.body.healthInsurance
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
    patientServices.update(
      req.params.id,
      req.body.fullName,
      req.body.address,
      req.body.telephone,
      req.body.patientFile,
      req.body.healthInsurance
    ).done(function() {
      res.json({
        success: true,
        message: 'se ha actualizado un paciente con éxito'
      });
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'no se ha podido actualizar al paciente'
    });
  }
});

router.delete('/:id', function(req, res, next) {
  try {
    patientServices.delete(req.params.id).done(function() {
      res.json({
        success: true,
        message: 'se ha eliminado un paciente con éxito'
      });
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'no se ha podido eliminar al paciente'
    });
  }
});

module.exports = router;
