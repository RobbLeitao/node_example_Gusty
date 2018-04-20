$(document).ready(function() {
  var $errorDiv = $('.submit-error');
  $('#address').val($('#addressHidden').val());
  $('#telephone').val($('#telephoneHidden').val());
  $('#fullName').val($('#fullNameHidden').val());
  $('#patientFile').val($('#patientFileHidden').val());
  $('#healthInsurance').val($('#healthInsuranceHidden').val());

  $errorDiv.hide();

  $('.back').click(function() {
    window.location.href = '/dashboard/patients';
  });

  formValidation();
});

function formValidation() {
  $.validator.methods.telephone = telephoneValidation;

  $.validator.methods.fullName = nameValidation;

  var id = $('#idHidden').val();

  $('#registerPatientForm').validate({
    rules: {
      fullName: {
        required: true,
        maxlength: 50,
        fullName: true
      },
      address: {
        required: true,
        maxlength: 50
      },
      patientFile: {
        required: true,
        maxlength: 50
      },
      healthInsurance: {
        required: true,
        maxlength: 50
      },
      telephone: {
        required: true,
        maxlength: 50,
        telephone: true
      }
    },
    messages: {
      fullName: {
        required: 'debe ingresar su nombre y apellido',
        maxlength: 'no debe exceder los 50 caracteres',
        fullName: 'solo deben ser caracteres alfabéticos'
      },
      address: {
        required: 'debe ingresar una dirección',
        maxlength: 'no debe exceder los 50 caracteres'
      },
      patientFile: {
        required: 'debe ingresar un legajo',
        maxlength: 'no debe exceder los 50 caracteres'
      },
      healthInsurance: {
        required: 'debe seleccionar una obra social',
      },
      telephone: {
        required: 'debe ingresar un telefono',
        maxlength: 'no debe exceder los 50 caracteres',
        telephone: 'sólo se admiten números'
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
}

function post() {
  $.post('/dashboard/patients', {
    fullName: $('#fullName').val(),
    address: $('#address').val(),
    patientFile: $('#patientFile').val(),
    healthInsurance: $('#healthInsurance').val(),
    telephone: $('#telephone').val()
  }).done(function(response) {
      if(response.success) {
        window.location.href = '/dashboard/patients';
      } else {
        $errorDiv.html('error al registrar').show();
      }
  });
}

function update(id) {
  try {
    $.ajax({
      url: '/dashboard/patients/' + id,
      type: 'put',
      data: {
        fullName: $('#fullName').val(),
        address: $('#address').val(),
        patientFile: $('#patientFile').val(),
        healthInsurance: $('#HealthInsurance').val(),
        telephone: $('#telephone').val()
      },
      success: function() {
        window.location.href = '/dashboard/patients';
      },
      fail: function() {
        $errorDiv.html('error al registrar').show();
      }
    });
  } catch (e) {

  }
}
