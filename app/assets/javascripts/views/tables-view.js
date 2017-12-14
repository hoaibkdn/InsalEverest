app.views.TablesView = function() {
  this.handleEvent('selectTable', this.selectTable);
}

app.views.TablesView.prototype.selectTable = function(caller) {
  // If is an empty table
  // console.log('self ', caller.attr('class'))
  let isEmpty = !caller.attr('class').includes('ordered')
  if(isEmpty) {
    $('.tabs-menu li').removeClass('active')
    $('.tabs-menu li a').attr('aria-expanded', false)
    $('.tabs-menu li:nth-child(2)').addClass('active')
    $('.tabs-menu li:nth-child(2) a').attr('aria-expanded', true)
    $('.tabs-menu__table').removeClass('active')
    $('.tabs-menu__product').addClass('active')
  }
}

app.views.TablesView.prototype.handleEvent = function(event, handler) {
  switch (event) {
    case 'selectTable':
      $('.floor-table').on('click', '.floor-table__item', function() {
        handler($(this));
      })
      break;

    default:
      break;
  }
}
