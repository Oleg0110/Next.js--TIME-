module.exports = class FavoriteProductDto {
  id
  userId
  product

  constructor(model) {
    this.id = model._id
    this.userId = model.userId
    this.product = model.product
  }
}
