app.models.Product = function(id, name, quantity, price, isSaved) {
  this.id = id;
  this.name = name;
  this.quantity = quantity;
  this.price = price;
  this.isSaved = isSaved || false;
}
