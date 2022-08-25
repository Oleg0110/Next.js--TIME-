module.exports = class PhotoDto {
  id
  productId
  userId
  comment
  rating
  date

  constructor(model) {
    this.id = model._id
    this.productId = model.productId
    this.userId = model.userId
    this.userName = model.userName
    this.comment = model.comment
    this.rating = model.rating
    this.date = model.date
  }
}
