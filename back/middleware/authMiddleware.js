const jwt = require('jsonwebtoken')
const TokenService = require('../services/TokenService')
const ApiErrors = require('../utils/apiErrors')

const authMiddleware = async (req, res, next) => {
  console.log(111, 'token token token')
  console.log(2, req)
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    console.log(111, token)

    if (!token) {
      return next(ApiErrors.NoTAuthorizedError())
    }

    const decoded = await TokenService.validateAccessToken(token)

    if (!decoded) {
      return next(ApiErrors.NoTAuthorizedError())
    }

    req.user = decoded

    next()
  } catch (e) {
    return next(ApiErrors.NoTAuthorizedError())
  }
}

module.exports = authMiddleware
