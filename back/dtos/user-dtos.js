module.exports = class UserDto {
  name
  surName
  email
  id
  isActivated
  userRole

  constructor(model) {
    this.name = model.name
    this.surName = model.surname
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivate
    this.userRole = model.role
  }
}
