$(document).ready(function() {
  $('#userOptions').click(function() {
    $('li.dropdown').toggleClass('open');
  });

  $('#userOptions').html(getUserName());

  if(!isAdmin()) {
    $('#userActions').remove();
  }
});
