$(document).ready(function() {
  var $divError = $('.submit-error');

  $divError.hide();

  $('#password, #userName').keypress(function() {
    $divError.hide();
  });

  loginValidation();

  function loginValidation() {
    $('#loginForm').validate({
      rules: {
        userName: {
          required: true,
          maxlength: 50
        },
        password: {
          required: true,
          maxlength: 50
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
        }
      },
     submitHandler: function(form) {
       login();
     }
    });
  }

  function login() {
    $.post('/login', {
      userName: $('#userName').val(),
      userPassword: $('#password').val()
    }).done(function(response) {
      if (response.success) {
        setUserName(response.user.userName);
        setUserRole(response.user.userRole);
        window.location.href = '/dashboard';
        return;
      }

      var message = response.message === 'wrong password!' ? 'contraseña invalida' : 'usuario invalido';
      $divError.html(message).show();
    });
  }

});
