var express = require('express');
var router = express.Router();
var appointmentServices = require('../services/appointments');
var _ = require('lodash');

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    appointmentServices.getAllWithPatientFileAndFullName().done(appointments => {
      console.log('is null' + appointments === null);
      if(!_.isNil(appointments)) {
        var _appointments = [];
        for (var i = 0 ; i < appointments.length ; i++ ) {
          _appointments.push(appointments[i].get());
        }
        console.log('app:  ------' + _appointments);
        res.render('appointments', { appointments: _appointments });
      } else {
        res.json({
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
});

router.get('/register', function(req, res, next) {
  res.render('register-appointment', { exists: false });
});

router.get('/edit/:id', function(req, res, next) {
  try {
    appointmentServices.getOne(req.params.id).done(appointment => {
      if(!_.isNil(appointment)) {
        _appointment = appointment.get();
        res.render('register-appointment', {
          id: _healthInsurance.id,
          patient: _healthInsurance.patient,
          appointmentTime: _healthInsurance.appointmentTime,
          startDate: _healthInsurance.startDate,
          endDate: _healthInsurance.endDate,
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
    appointmentServices.save(
      req.body.patient,
      req.body.appointmentTime,
      req.body.startDate,
      req.boy.endDate
    ).done(function() {
      res.status(201).json({
        success: true,
        message: 'se ha registrado un turno con éxito'
      });
    });
  } catch (e) {
    res.json({
      success: false,
      message: 'no se ha podido registrar al turno'
    });
  }
});

router.put('/:id', function(req, res, next) {
  try {
    appointmentServices.update(
      req.body.patient,
      req.body.appointmentTime,
      req.body.startDate,
      req.boy.endDate
    ).done(function() {
      res.json({
        success: true,
        message: 'se ha actualizado un turno con éxito'
      });
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'no se ha podido actualizar al turno'
    });
  }
});

router.delete('/:id', function(req, res, next) {
  try {
    appointmentServices.delete(req.params.id).done(function() {
      res.json({
        success: true,
        message: 'se ha eliminado un turno con éxito'
      });
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'no se ha podido eliminar al turno'
    });
  }
});

module.exports = router;
