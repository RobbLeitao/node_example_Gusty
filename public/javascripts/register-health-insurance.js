$(document).ready(function() {
  var $errorDiv = $('.submit-error');
  $('#address').val($('#addressHidden').val());
  $('#telephone').val($('#telephoneHidden').val());
  $('#fullName').val($('#fullNameHidden').val());
  $errorDiv.hide();

  $('.back').click(function() {
    window.location.href = '/dashboard/health-insurances';
  });

  formValidation();
});

function formValidation() {
  $.validator.methods.telephone = telephoneValidation;
  var id = $('#idHidden').val();

  $('#registerHealthInsuranceForm').validate({
    rules: {
      fullName: {
        required: true,
        maxlength: 50
      },
      address: {
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
        maxlength: 'no debe exceder los 50 caracteres'
      },
      address: {
        required: 'debe ingresar una dirección',
        maxlength: 'no debe exceder los 50 caracteres'
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

  function post() {
    $.post('/dashboard/health-insurances', {
      fullName: $('#fullName').val(),
      address: $('#address').val(),
      telephone: $('#telephone').val()
    }).done(function(response) {
        if(response.success) {
          window.location.href = '/dashboard/health-insurances';
        } else {
          $errorDiv.html('error al registrar').show();
        }
    });
  }

  function update(id) {
    try {
      $.ajax({
        url: '/dashboard/health-insurances/' + id,
        type: 'put',
        data: {
          fullName: $('#fullName').val(),
          address: $('#address').val(),
          telephone: $('#telephone').val()
        },
        success: function() {
          window.location.href = '/dashboard/health-insurances';
        },
        fail: function() {
          $errorDiv.html('error al registrar').show();
        }
      });
    } catch (e) {

    }
  }
}
