app.views.ManageTableView = function () {
  this.initAllTable();
  this.initAllPostion();
  this.handleEvent('load');
  this.handleEvent('selectPosition');
}

app.views.ManageTableView.prototype.initAllTable = function () {
  this.tables = $('#allTables').DataTable({
    "lengthChange": false,
  });
}

app.views.ManageTableView.prototype.initAllPostion = function () {
  this.position = $('#allPosition').DataTable({
    "lengthChange": false,
  });
}

app.views.ManageTableView.prototype.onLoad = function () {
  $('.t-positions').addClass('active');
  // $('.selectpicker').selectpicker();
}

app.views.ManageTableView.prototype.handleEvent = function (event) {
  var self = this;
  switch (event) {
    case 'selectPosition':
      $('.select-position').change(function() {
        var position = $(this).val();
        if(position === 'All tables') {
          position = '';
        }
        self.tables.column(2).search(position).draw() ;
      });
      break;

    default:
      self.onLoad();
      break;
  }
}
