const jwt = require('jsonwebtoken')
const TokenService = require('../services/TokenService')
const ApiErrors = require('../utils/apiErrors')

const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

      if (!token) {
        return next(ApiErrors.NoTAuthorizedError())
      }

      const { userRole } = await TokenService.validateAccessToken(token)

      if (!userRole) {
        return next(ApiErrors.NoTAuthorizedError())
      }

      let hasRole = false

      userRole.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })

      if (!hasRole) {
        return next(ApiErrors.BadRequest("You don't have access"))
      }

      next()
    } catch (e) {
      return next(ApiErrors.NoTAuthorizedError())
    }
  }
}

module.exports = roleMiddleware
