app.views.BoardView = function () {
  this.handleEvent('handleButton');
  this.handleEvent('onLoad');
}

app.views.BoardView.prototype.getProductsOnBoard = function () {
  var currentTable = localStorage.getItem('tableNumber'),
      orderedProducts = JSON.parse(localStorage.getItem('orderedProducts'))
      productsOnTable = currentTable && orderedProducts && orderedProducts[currentTable];
  return productsOnTable
}

app.views.BoardView.prototype.insertOnBoard = function (product) {
  var totalPrice = app.helpers.convertPriceToNumber(product.price) * product.quantity;
  product.quantity && $('.ordered-board__table tbody').append(
    '<tr data-id=' + product.id +'>' +
      '<td class="ordered-board__table--name">' + product.name + '</td>' +
      '<td class="ordered-board__table--quantity">' +
        '<i class="fa fa-caret-up fa-lg up-caret"></i>' +
        '<p class="ordered-board__table--number">' + product.quantity + '</p>' +
        '<i class="fa fa-caret-down fa-lg"></i>' +
      '</td>' +
      '<td class="ordered-board__table--price" data-price="' + product.price + '">' + app.helpers.reversePrice(totalPrice) + '</td>' +
      '<td>' +
        '<i class="fa fa-times-circle fa-lg ordered-board__table--delete" aria-hidden="true"></i>' +
      '</td>' +
    '</tr>'
  )
}

// btnObj = {saveBtn: true, paymentBtn: false}
app.views.BoardView.prototype.updateStatusBtn = function (btnObj) {
  var saveBtn = $('.ordered-board__btn-group--save'),
      paymentBtn = $('.ordered-board__btn-group--pay ')
  saveBtn.prop('disabled', !btnObj['saveBtn']);
  paymentBtn.prop('disabled', !btnObj['paymentBtn'])
  if(btnObj['saveBtn']) {
    saveBtn.addClass('btn-strong');
    paymentBtn.removeClass('btn-strong');
    saveBtn.removeClass('btn-normal');
    paymentBtn.addClass('btn-normal');
  }
  if(btnObj['paymentBtn']) {
    saveBtn.addClass('btn-strong');
    paymentBtn.removeClass('btn-strong');
    saveBtn.removeClass('btn-normal');
    paymentBtn.addClass('btn-normal');
  }
  if(!btnObj['saveBtn'] && btnObj['paymentBtn']) {
    paymentBtn.addClass('btn-strong');
    saveBtn.removeClass('btn-strong');
    paymentBtn.removeClass('btn-normal');
    saveBtn.addClass('btn-normal');
  }
}

// savedTables = [1, 3, 6], type = "remove"
app.views.BoardView.prototype.saveStatusTable = function (tableNumber, type) {
  var savedTables = JSON.parse(localStorage.getItem('savedTables')) || [],
      tableIndex = null,
      orderedProducts = JSON.parse(localStorage.getItem('orderedProducts'))
  if(savedTables.length > 0) { // existed saved list
    tableIndex = savedTables.findIndex((table) => table === tableNumber);
    (orderedProducts && orderedProducts[tableNumber]) ?
       this.updateStatusBtn({saveBtn: true, paymentBtn: false}) : // ordering
       this.updateStatusBtn({saveBtn: false, paymentBtn: false}); // empty
    (tableIndex >= 0) && this.updateStatusBtn({saveBtn: false, paymentBtn: true})  // ordered
    if (type === 'remove') {
      savedTables.splice(tableIndex, 1);
      this.updateStatusBtn({saveBtn: true, paymentBtn: false})
    }
  }
  else { //  1. ordering | empty
    (orderedProducts && orderedProducts[tableNumber]) ? // ordering
      this.updateStatusBtn({saveBtn: true, paymentBtn: false}) :
      this.updateStatusBtn({saveBtn: false, paymentBtn: false}); // empty
      (type !== 'remove') && savedTables.push(tableNumber);
  }
  localStorage.setItem('savedTables', JSON.stringify(savedTables))
}

app.views.BoardView.prototype.totalMoney = function () {
  var price = $('.ordered-board__table--price'),
      priceLength = price.length,
      total = 0,
      totalEle = $('.ordered-board__number.total'),
      moneyEle = $('.ordered-board__number.money'),
      discount = parseFloat($('.ordered-board__number.discount').text().split(' ')[0]);
  for(var i = 0; i < priceLength; i++) {
    total += app.helpers.convertPriceToNumber($(price[i]).text())
  }
  console.log('discount ', discount)
  console.log('money ', app.helpers.reversePrice((total * discount) / 100))
  totalEle.html(app.helpers.reversePrice(total))
  moneyEle.html(app.helpers.reversePrice(total -  (total * discount) / 100))
}

app.views.BoardView.prototype.onLoad = function () {
  console.log('@@@ savedTables ', JSON.parse(localStorage.getItem('savedTables')))
  console.log('@@@ orderedProducts ', JSON.parse(localStorage.getItem('orderedProducts')))
  console.log('@@@ tableNumber ', JSON.parse(localStorage.getItem('tableNumber')))
  var currentTable = localStorage.getItem('tableNumber'),
      self = this,
      orderedProducts = JSON.parse(localStorage.getItem('orderedProducts'));
  $('.ordered-board__info p:nth-child(3) span').html(currentTable);
  if(orderedProducts && orderedProducts[currentTable]) {
    app.orderedProducts = orderedProducts;
    app.orderedProducts[currentTable].forEach(function (product) {
      self.insertOnBoard(product);
    })
  }
}

app.views.BoardView.prototype.addStyleForOrderingTable = function (currentTable) {
  var tablesEle = $('.floor-table__item'),
      savedTables = JSON.parse(localStorage.getItem('savedTables')),
      numOfTables = savedTables.length,
      numOfEle = tablesEle.length,
      orderedProducts = JSON.parse(localStorage.getItem('orderedProducts'));

  for(let i = 0; i < numOfEle; i++) {
    var tableNumber = parseInt($(tablesEle[i]).children('p').text());
    for(let j = 0; j < numOfTables; j++) {
      if(tableNumber === savedTables[j]) {
        $(tablesEle[i]).removeAttr('style')
        $(tablesEle[i]).addClass('ordered');
        continue;
      }
    }
    if((orderedProducts && orderedProducts[tableNumber] && !$(tablesEle[i]).attr('class').includes('ordered')) || (currentTable === tableNumber)) {
      $(tablesEle[i]).css('background-color', 'yellow');
      continue;
    }
  }

}

app.views.BoardView.prototype.handleEvent = function (event) {
  var self = this;
  switch (event) {
    case 'handleButton':
      $('.ordered-board__btn-group').on('click', '.ordered-board__btn-group--save', function () {
        var tableNumber = JSON.parse(localStorage.getItem('tableNumber'));
            savedTables = JSON.parse(localStorage.getItem('savedTables'));
        savedTables.push(tableNumber);
        localStorage.setItem('savedTables', JSON.stringify(savedTables));
        self.saveStatusTable(tableNumber);
        self.addStyleForOrderingTable();
      })
      break;

    default:
      var tableNumber = JSON.parse(localStorage.getItem('tableNumber'))
      self.onLoad();
      self.saveStatusTable(tableNumber);
      self.totalMoney(tableNumber);
      self.addStyleForOrderingTable();
      break;
  }

}
