app.helpers.convertPriceToNumber = function(priceStr) {
  var splitted = priceStr.split(' ');
  return parseFloat(splitted.join(''));
}

app.helpers.reversePrice = function(price) {
  var priceLength = price.toString().length,
      priceArr = [],
      surplus = 0;
  while ( price.toString().length > 3) {
    priceArr.push( (price % 1000 === 0) ? '000' : ('000' + (price % 1000)).substr(-3));
    price = parseInt(price / 1000);
  }
  priceArr.push(price);
  return priceArr.reverse().join(' ');
}
