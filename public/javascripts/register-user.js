$(document).ready(function() {
  var $errorDiv = $('.submit-error');

  $('#userName').val($('#userNameHidden').val());
  $('#email').val($('#emailHidden').val());
  $('#fullName').val($('#fullNameHidden').val());
  $('#role').val($('#roleHidden').val());

  $errorDiv.hide();

  $('.back').click(function() {
    window.location.href = '/dashboard/users';
  });

  formValidation();
});

function formValidation() {
  $.validator.methods.email = emailValidation;

  $.validator.methods.passwordConfirm = passwordConfirmValidation;

  $.validator.methods.fullName = nameValidation;

  var id = $('#idHidden').val();

  $('#registerUserForm').validate({
    rules: {
      userName: {
        required: true,
        maxlength: 50
      },
      password: {
        required: true,
        maxlength: 50
      },
      passwordConfirm: {
        required: true,
        maxlength: 50,
        passwordConfirm: true
      },
      fullName: {
        required: true,
        maxlength: 50,
        fullName: true
      },
      email: {
        required: true,
        maxlength: 50,
        email: true
      },
      role: {
        required: true
      }
    },
    messages: {
      userName: {
        required: 'debe ingresar un nombre de usuario',
        maxlength: 'no debe exceder los 50 caracteres'
      },
      password: {
        required: 'debe ingresar una contraseña',
        maxlength: 'no debe exceder los 50 caracteres'
      },
      passwordConfirm: {
        required: 'debe confirmar la contraseña',
        maxlength: 'no debe exceder los 50 caracteres',
        passwordConfirm: 'no coincide la contraseña'
      },
      fullName: {
        required: 'debe ingresar su nombre y apellido',
        maxlength: 'no debe exceder los 50 caracteres',
        fullName: 'solo deben ser caracteres alfabéticos'
      },
      email: {
        required: 'debe ingresar un email',
        maxlength: 'no debe exceder los 50 caracteres',
        email: 'no es un formato válido'
      },
      role: {
        required: 'debe seleccionar un rol'
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
  $.post('/dashboard/users', {
    userName: $('#userName').val(),
    userPassword: $('#password').val(),
    userEmail: $('#email').val(),
    fullName: $('#fullName').val(),
    userRole: $('#role').val()
  }).done(function(response) {
      if(response.success) {
        window.location.href = '/dashboard/users';
      } else {
        $errorDiv.html('error al registrar').show();
      }
  });
}

function update(id) {
  (id);
  try {
    $.ajax({
      url: '/dashboard/users/' + id,
      type: 'put',
      data: {
        userName: $('#userName').val(),
        userPassword: $('#password').val(),
        userEmail: $('#email').val(),
        fullName: $('#fullName').val(),
        userRole: $('#role').val()
      },
      success: function() {
        window.location.href = '/dashboard/users';
      },
      fail: function() {
        $errorDiv.html('error al registrar').show();
      }
    });
  } catch (e) {

  }
}
