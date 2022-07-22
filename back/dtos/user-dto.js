module.exports = class UserDto {
  name
  surname
  email
  id
  isActivated
  userRole
  favoriteProducts
  phone

  constructor(model) {
    this.name = model.name
    this.surname = model.surname
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivate
    this.userRole = model.role
    this.favoriteProducts = model.favoriteProducts
    this.phone = model?.phone
  }
}
