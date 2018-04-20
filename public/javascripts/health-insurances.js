$(document).ready(function() {
  $('#healthInsurancesGrid').DataTable({
    'language': {
    'url': 'http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
    }
  }).on('init.dt', function() {
    $('#healthInsurancesGrid_filter').prepend($('#registerNew'));

    deleteItem();
  });
});

function deleteItem() {
  $('.delete').click(function() {
    var $item = $(this);
    let id = $item.children('input').val();
    $.ajax({
      url: '/dashboard/health-insurances/' + id,
      type: 'delete',
    }).done(function() {
        window.location.reload();
    });
  });
}
