module.exports = class OrderDto {
  id
  orderNumber
  userName
  userSurname
  userRegion
  userAddress
  userPhone
  userCity
  userEmail
  orderProducts
  orderStatus
  totalPrice

  constructor(model) {
    this.id = model._id
    this.orderNumber = model.orderNumber
    this.userName = model.userName
    this.userSurname = model.userSurname
    this.userRegion = model.userRegion
    this.userAddress = model.userAddress
    this.userPhone = model.userPhone
    this.userCity = model.userCity
    this.userEmail = model.userEmail
    this.orderProducts = model.orderProducts
    this.orderStatus = model.orderStatus
    this.totalPrice = model.totalPrice
  }
}
