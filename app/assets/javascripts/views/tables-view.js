app.views.TablesView = function() {
  this.handleEvent('selectTable');
  this.handleEvent('onLoad');
  this.handleEvent('onSelectTab');
}

app.views.TablesView.prototype.selectTable = function(caller) {
  // Add style focus table
  $('.floor-table__item').removeClass('focus');
  caller.addClass('focus');

  let isEmpty = !caller.attr('class').includes('ordered');

  // If is an empty table change tab to Product
  if(isEmpty) {
    this.activeTab(2, 'tabs-menu__product');

    // Add number of table into board
    var tableNumber = caller.children('.floor-table__number').text(),
        displayingTable = $('.ordered-board__info p:nth-child(3) span').text();
    $('.ordered-board__info p:nth-child(3) span').html(tableNumber);
    localStorage.setItem('tableNumber', tableNumber.toString());

    // Clear ordering board If doesn't save into localstorage
    var orderedProducts = JSON.parse(localStorage.getItem('orderedProducts'));
    if(orderedProducts) {
      $('.ordered-board__table').find('tbody tr').remove();
      if(orderedProducts[tableNumber]) {
        orderedProducts[tableNumber].forEach(function (product) {
          (displayingTable !== tableNumber) && app.productView.insertOnBoard(product);
        });
        this.renderQuantityOnProducts();
      }
    }
  }
}

app.views.TablesView.prototype.keepCurrentTab = function() {
  var tabLocal = JSON.parse(localStorage.getItem('tabActive'));
  (tabLocal) ? this.activeTab(tabLocal.indexTab, tabLocal.currentTab) : this.activeTab(1, 'tabs-menu__table');
}

app.views.TablesView.prototype.keepDisplayingTable = function () {
  var currentTable = localStorage.getItem('tableNumber'),
      labels = $('.floor-table__number'),
      tablesLength = labels.length;

  for(let i = 0; i < tablesLength; i++) {
    if($(labels[i]).text() === currentTable) {
      $(labels[i]).closest('.floor-table__item').addClass('focus')
    }
  }
}

app.views.TablesView.prototype.activeTab = function(index, tabName) {
  $('.tabs-menu li').removeClass('active');
  $('.tabs-menu li a').attr('aria-expanded', false);
  $('.tabs-menu li:nth-child(' + index + ')').addClass('active');
  $('.tabs-menu li:nth-child(' + index + ') a').attr('aria-expanded', true);
  $('.tabs-menu__content div').removeClass('active');
  $('.' + tabName).addClass('active');

  // Active content
  this.displayChildContent(tabName);
}

app.views.TablesView.prototype.displayChildContent = function (tabName) {
  if(tabName === 'tabs-menu__product') {
    $('.tab-product__content div:nth-child(1)').addClass('active');
  }
}
app.views.TablesView.prototype.saveCurrentTab = function (tab) {
  var currentTab = (tab) ? tab.attr('data-tab') : $('.tabs-menu .active').attr('data-tab'),
      indexTab = this.findIndexTab(currentTab) + 1;
  localStorage.setItem('tabActive', JSON.stringify({indexTab, currentTab}));
}
app.views.TablesView.prototype.findIndexTab = function (dataTab) {
  var allTabs = $('.tabs-menu li'),
      tabLength = allTabs.length;
  for( let i = 0; i < tabLength; i++) {
    if($(allTabs[i]).attr('data-tab') === dataTab) {
      return i;
    }
  }
  return -1;
}

app.views.TablesView.prototype.renderQuantityOnProducts = function () {
  var currentTable = localStorage.getItem('tableNumber'),
      orderedProducts = JSON.parse(localStorage.getItem('orderedProducts')),
      products = $('.product'),
      numOfProducts = products.length;
  if(orderedProducts && orderedProducts[currentTable]) {
    orderedProducts[currentTable].forEach(function (pro) {
      for(let i = 0; i < numOfProducts; i++) {
        if($(products[i]).attr('data-id') === pro.id) {
          $(products[i]).find('.product__quantity--number').val(pro.quantity)
        }
      }
    })
  }
  else {
    for(let i = 0; i < numOfProducts; i++) {
      $(products[i]).find('.product__quantity--number').val(0)
    }
  }
}

app.views.TablesView.prototype.handleEvent = function(event, handler) {
  var self = this;
  switch (event) {
    case 'selectTable':
      $('.floor-table').on('click', '.floor-table__item', function() {
        self.selectTable($(this));
        self.saveCurrentTab();
      })
      break;

    case 'onSelectTab':
      $('.tabs-menu').on('click', 'li', function() {
        self.saveCurrentTab($(this));
        self.displayChildContent($(this).attr('data-tab'));
      });
      break;
    default:
      self.keepCurrentTab();
      self.keepDisplayingTable();
      self.renderQuantityOnProducts();
      break;
  }
}
