app.views.ProductsView = function () {
  var that = this;
  this.handleEvent('ordering', that.ordering);
  this.handleEvent('onLoad');
}

app.views.ProductsView.prototype.convertPriceToNumber = function(priceStr) {
  var splitted = priceStr.split(' ');
  return parseFloat(splitted.join(''));
}

app.views.ProductsView.prototype.reversePrice = function(price) {
  var priceLength = price.toString().length,
      priceArr = [],
      surplus = 0;
  while ( price.toString().length > 3) {
    priceArr.push( (price % 1000 === 0) ? '000' : price % 1000);
    price = parseInt(price / 1000);
  }
  priceArr.push(price);
  return priceArr.reverse().join(' ');
}

// Change quantity both product and on board
app.views.ProductsView.prototype.changeQuantity = function(caller, tableNumber, productId, type) {
  var quantityItem = (type === 'UP') ? caller.next() : caller.prev(),
      quantity = parseInt(quantityItem.val() || quantityItem.text()),
      self = this,
      currentProduct = self.getProductFromList(tableNumber, caller.closest('.product'));
  if(quantity === 0 && type === 'DOWN') return;
  if(quantityItem.attr('class') === 'product__quantity--number') { // From List
    self.displayProductOnBoard(tableNumber, quantityItem, currentProduct, type, true);
  }
  else {
    var $eleProduct = self.findEleProduct('LIST', productId),
        quantityOnList = parseInt($eleProduct.find('.product__quantity--number').val()),
        isUpdateList = quantityOnList === quantity;

    // Update on board
    var pressingProduct = self.getProductFromBoard(caller.closest('tr'));
    self.displayProductOnBoard(tableNumber, $eleProduct.find('.product__quantity--number'), pressingProduct, type, isUpdateList);
  }

}

app.views.ProductsView.prototype.getProductFromBoard = function(caller) {
  var id = caller.attr('data-id'),
      name = caller.find('.ordered-board__table--name').text(),
      price = caller.find('.ordered-board__table--price').attr('data-price'),
      quantity = caller.find('.ordered-board__table--number').text();
  return new app.models.Product(id, name, quantity, price);
}

// Display product on board with total of the product = quantity * price
app.views.ProductsView.prototype.displayProductOnBoard = function (tableNumber, quantityItem, currentProduct, typeChanged, isUpdateList ) {
  var $eleProduct = this.findEleProduct('BOARD',currentProduct.id),
      quantity = parseInt(currentProduct.quantity),
      changedQuantity = typeChanged === 'UP' ? (quantity + 1) : (quantity - 1);
  currentProduct.quantity = changedQuantity;
  if($eleProduct) {
    var price = this.convertPriceToNumber($eleProduct.find('.ordered-board__table--price').attr('data-price')),
        total = price * changedQuantity;
    if(changedQuantity === 0) {
      isUpdateList && quantityItem.val(0);
      $eleProduct.remove();
      this.removeProductOutLocal(tableNumber, currentProduct.id);
    }
    else {
      $eleProduct.find('.ordered-board__table--number').text(changedQuantity);
      $eleProduct.find('.ordered-board__table--price').text(this.reversePrice(total));
      isUpdateList && quantityItem.val(changedQuantity);
    }
  } else {
    isUpdateList && quantityItem.val(changedQuantity);
    this.insertOnBoard(currentProduct);
  }
  this.updateLocal(tableNumber, currentProduct);
}

app.views.ProductsView.prototype.removeProductOutLocal = function (tableNumber, productId) {
  var orderedProducts = localStorage.getItem('orderedProducts');
  if(orderedProducts) {
    app.orderedProducts = JSON.parse(orderedProducts);
    var productIndex = app.orderedProducts[tableNumber].findIndex(function (pro) {
      return pro.id === productId;
    });
    app.orderedProducts[tableNumber].splice(productIndex, 1);
    localStorage.setItem('orderedProducts', JSON.stringify(app.orderedProducts));
  }
}

// Find Element wrap product
app.views.ProductsView.prototype.findEleProduct = function(type, productId) {
  console.log('productId ', productId )
  var lines = (type === 'BOARD') ?
              $('.ordered-board__table').find('tbody tr') :
              $('.tab-product__content').find('.product'),
      linesSize = lines.length,
      id = null;
  for(let i = 0; i < linesSize; i++) {
    id = ($(lines[i]).attr('data-id'));
    if(productId === id) {
      return $(lines[i])
    }
  }
  return 0;
}

app.views.ProductsView.prototype.getProductFromList = function(tableNumber, caller) {

  // caller == $(.product)
  var id = caller.attr('data-id'),
      name = caller.find('.product__text--name').text(),
      price = caller.find('.product__text--price').text(),
      quantity = caller.find('.product__quantity--number').val();
  return new app.models.Product(id, name, quantity, price);
}

app.views.ProductsView.prototype.insertOnBoard = function (product) {
  var totalPrice = this.convertPriceToNumber(product.price) * product.quantity;
  product.quantity && $('.ordered-board__table tbody').append(
    '<tr data-id=' + product.id +'>' +
      '<td class="ordered-board__table--name">' + product.name + '</td>' +
      '<td class="ordered-board__table--quantity">' +
        '<i class="fa fa-caret-up fa-lg up-caret"></i>' +
        '<p class="ordered-board__table--number">' + product.quantity + '</p>' +
        '<i class="fa fa-caret-down fa-lg"></i>' +
      '</td>' +
      '<td class="ordered-board__table--price" data-price="' + product.price + '">' + this.reversePrice(totalPrice) + '</td>' +
      '<td>' +
        '<i class="fa fa-times-circle fa-lg ordered-board__table--delete" aria-hidden="true"></i>' +
      '</td>' +
    '</tr>'
  )
}

app.views.ProductsView.prototype.updateLocal = function(tableNumber, product) {
  var orderedProducts = localStorage.getItem('orderedProducts');
  var self = this;
  if(orderedProducts) {
    app.orderedProducts = JSON.parse(orderedProducts)
    var duplicateProduct = self.duplicateProduct(tableNumber, product.id);
    if(duplicateProduct) {
      duplicateProduct.quantity = product.quantity
      var indexProduct = app.orderedProducts[tableNumber].findIndex(function(pro) {
        return pro.id === product.id
      });
      app.orderedProducts[tableNumber][indexProduct] = duplicateProduct
    }
    else {
      if(!app.orderedProducts[tableNumber]) {
        app.orderedProducts[tableNumber] = []
      }
      app.orderedProducts[tableNumber].push(product)
    }
  }
  else {
    app.orderedProducts[tableNumber] = [];
    app.orderedProducts[tableNumber].push(product)
  }
  localStorage.setItem('orderedProducts', JSON.stringify(app.orderedProducts));
}

app.views.ProductsView.prototype.ordering = function(tableNumber, caller, typeChanged) {
  var $elProduct = (caller.closest('tr')) ? caller.closest('tr') : caller.closest('.product'),
      productId = caller.closest('tr').attr('data-id');
  this.changeQuantity(caller, tableNumber, productId, typeChanged);
}


app.views.ProductsView.prototype.duplicateProduct = function(tableNumber, productId) {
  productsPerTable = app.orderedProducts[tableNumber];
  return duplicateProduct = productsPerTable && productsPerTable.find(function(currentProduct) {
    return currentProduct.id === productId
  })
}

app.views.ProductsView.prototype.deleteProduct = function (tableNumber, caller) {
  var productId = caller.attr('data-id'),
      $eleProduct = this.findEleProduct('LIST', productId);
  this.removeProductOutLocal(tableNumber, productId);
  caller.remove();
  $eleProduct.find('.product__quantity--number').val(0);
}

app.views.ProductsView.prototype.onLoad = function () {
  var currentTable = localStorage.getItem('tableNumber'),
      self = this;
  app.orderedProducts = JSON.parse(localStorage.getItem('orderedProducts'));
  $('.ordered-board__info p:nth-child(3) span').html(currentTable);
  if(app.orderedProducts && app.orderedProducts[currentTable]) {
    app.orderedProducts[currentTable].forEach(function (product) {
      self.insertOnBoard(product);
    })
  }
}

app.views.ProductsView.prototype.handleEvent = function(event, handler) {
  var self = this;
  switch (event) {
    case 'ordering':
    $('.tabs-content').on('click', '.fa-caret-up', function() {
        var tableNumber = $('.ordered-board__info p:nth-child(3) span').text();
        self.ordering(tableNumber, $(this), 'UP');
        console.log('LocalStorage ', JSON.parse(localStorage.getItem('orderedProducts')))
      });
      $('.tabs-content').on('click', '.fa-caret-down', function() {
        var tableNumber = $('.ordered-board__info p:nth-child(3) span').text();
        self.ordering(tableNumber, $(this), 'DOWN');
        console.log('LocalStorage ', JSON.parse(localStorage.getItem('orderedProducts')))
      });
      $('.ordered-board__ordering').on('click', '.ordered-board__table--delete', function () {
        var tableNumber = $('.ordered-board__info p:nth-child(3) span').text();
        self.deleteProduct(tableNumber, $(this).closest('tr'));
        console.log('LocalStorage ', JSON.parse(localStorage.getItem('orderedProducts')))
      })
      break;

    default:
      self.onLoad();
      break;
  }
}
