module.exports = class ApiErrors extends Error {
  status
  errors

  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static NoTAuthorizedError() {
    return new ApiErrors(401, 'No authorization')
  }

  static BadRequest(message, errors = []) {
    return new ApiErrors(400, message, errors)
  }
}
