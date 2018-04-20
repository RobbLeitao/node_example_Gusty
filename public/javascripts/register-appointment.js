$(document).ready(function() {
  var $errorDiv = $('.submit-error');
  $('#patient').val($('#patientHidden').val());
  $('#appointmentTime').val($('#appointmentTimeHidden').val());
  $('#startDate').val($('#startDateHidden').val());
  $('#endDate').val($('#startDateHidden').val());
  $errorDiv.hide();

/*  $.datepicker.formatDate('dd-mm-yy');
  $.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );*/
  $startDate = $('#startDate').datepicker({ dateFormat: 'dd-mm-yy' });
  $endDate = $('#endDate').datepicker({ dateFormat: 'dd-mm-yy' });

  $('.back').click(function() {
    window.location.href = '/dashboard/appointments';
  });

  formValidation();
});

function formValidation() {
  var id = $('#idHidden').val();

  $.validator.methods.dateIsGreaterThan = dateIsGreaterThan;
  $('#registerAppointmentForm').validate({
    rules: {
      patientFile: {
        required: true,
        maxlength: 8,
        numeric: true
      },
      appointmentTime: {
        required: true,
        maxlength: 50
      },
      startDate: {
        required: true,
        dateIsGreaterThan: true
      },
      endDate: {
        required: true
      }
    },
    messages: {
      patientFile: {
        required: 'debe ingresar el legajo del paciente',
        maxlength: 'no debe exceder los 50 caracteres'
      },
      appointmentTime: {
        required: 'debe ingresar una hora',
        maxlength: 'no debe exceder los 50 caracteres'
      },
      startDate: {
        required: 'debe ingresar fecha de inicio',
        dateIsGreaterThan: 'debe ser menor o igual a la fecha de fin'
      },
      endDate: {
        required: 'debe ingresar fecha de fin',
      }
    },
     submitHandler: function(form) {
      if(!_.isUndefined(id)) {
        update(id);

        return;
      }
      post();
     }
  });

  function post() {
    $.post('/dashboard/appointments', {
      patientFile: $('#patientFile').val(),
      appointmentTime: $('#appointmentTime').val(),
      startDate: $('#startDate').val(),
      endDate: $('#endDate').val()
    }).done(function(response) {
        if(response.success) {
          window.location.href = '/dashboard/appointments';
        } else {
          $errorDiv.html('error al registrar').show();
        }
    });
  }

  function update(id) {
    try {
      $.ajax({
        url: '/dashboard/appointments/' + id,
        type: 'put',
        data: {
          patientFile: $('#patientFile').val(),
          appointmentTime: $('#appointmentTime').val(),
          startDate: $('#startDate').val(),
          endDate: $('#endDate').val()
        },
        success: function() {
          window.location.href = '/dashboard/appoitments';
        },
        fail: function() {
          $errorDiv.html('error al registrar').show();
        }
      });
    } catch (e) {

    }
  }
}
