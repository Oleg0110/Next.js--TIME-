module.exports = class PhotoDto {
  id
  productId
  photoName

  constructor(model) {
    this.id = model._id
    this.productId = model.productId
    this.photoName = model.photoName
  }
}
