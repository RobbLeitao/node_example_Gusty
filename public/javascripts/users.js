$(document).ready(function() {
  $('#usersGrid').DataTable({
    'language': {
    'url': 'http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
    }
  }).on('init.dt', function() {
    $('#usersGrid_filter').prepend($('#registerNew'));

    deleteItem();
  });
});

function deleteItem() {
  $('.delete').click(function() {
    var $item = $(this);
    let id = $item.children('input').val();
    $.ajax({
      url: '/dashboard/users/' + id,
      type: 'delete',
    }).done(function() {
        window.location.reload();
    });
  });
}
