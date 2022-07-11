module.exports = class ProductDto {
  id
  productName
  productNumber
  productFor
  productPrice
  productDiscountPrice
  productSale
  productNew
  productSize
  productColor
  productMainPictures
  productDescription
  productStyleName
  productStyleMaterial
  date

  constructor(model) {
    this.id = model._id
    this.productName = model.productName
    this.productNumber = model.productNumber
    this.productFor = model.productFor
    this.productPrice = model.productPrice
    this.productDiscountPrice = model.productDiscountPrice
    this.productSale = model.productSale
    this.productNew = model.productNew
    this.productSize = model.productSize
    this.productColor = model.productColor
    this.productMainPictures = model.productMainPictures
    this.productDescription = model.productDescription
    this.productStyleName = model.productStyleName
    this.productStyleMaterial = model.productStyleMaterial
    this.date = model.date
  }
}
