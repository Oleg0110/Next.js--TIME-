const User = require('../models/User')
const UserService = require('../services/UserService.js')
const ApiErrors = require('../utils/apiErrors')

class UserController {
  // Get
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link

      const activatedUser = await UserService.activate(activationLink, res, next)
      // if (activatedUser.isActivate){
      //   return res.redirect(process.env.CLIENT_URL).json({ message: 'Successful registration' })
      // }
      return activatedUser
    } catch (e) {
      return next(e)
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      // console.log(refreshToken)

      const userData = await UserService.refreshToken(refreshToken)
      // console.log(userData)

      res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.status(200).json({ message: 'Successful refresh token', ...userData })
    } catch (e) {
      return next(e)
    }
  }

  async getOrders(req, res) {
    try {
      const { userId } = req.params

      if (!userId) {
        return next(ApiErrors.BadRequest('invalid data'))
      }
      const orders = await UserService.getOrders(userId)

      res.status(200).json(orders)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async checkPassword(req, res, next) {
    try {
      const { userId, password } = req.params

      if (!userId && !password) {
        return next(ApiErrors.BadRequest('invalid data'))
      }
      const orders = await UserService.checkPassword(userId, password)

      res.status(200).json(orders)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async sendConfirmCode(req, res, next) {
    try {
      const { userId, code } = req.params

      if (!userId && !code) {
        return next(ApiErrors.BadRequest('invalid data'))
      }
      const orders = await UserService.sendConfirmCode(userId, code)

      res.status(200).json(orders)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  // Post
  async registration(req, res, next) {
    try {
      return await UserService.registration(req, res, next)
    } catch (e) {
      return next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email && !password) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      return await UserService.login(email, password, res, next)
    } catch (e) {
      return next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await UserService.logout(refreshToken)

      res.clearCookie('refreshToken')

      return res.status(200).json({ message: 'Successful logout', userData })
    } catch (e) {
      return next(e)
    }
  }

  async createOrder(req, res) {
    try {
      const { userOrderData, orderProducts, totalPrice, userId } = req.body

      if (!userOrderData && !orderProducts && !totalPrice) {
        return next(ApiErrors.BadRequest('invalid data'))
      }
      const order = await UserService.createOrder(userOrderData, orderProducts, totalPrice, userId)

      res.status(200).json(order)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  // Patch
  async changeUserData(req, res, next) {
    try {
      const { userId, value, changeWhat } = req.body

      if (!userId && !value && !changeWhat) {
        return next(ApiErrors.BadRequest('invalid data'))
      }
      const orders = await UserService.changeUserData(userId, value, changeWhat, next)

      res.status(200).json(orders)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async addUserPhone(req, res, next) {
    try {
      const { userId, phone } = req.body

      if (!userId && !phone) {
        return next(ApiErrors.BadRequest('invalid data'))
      }
      const user = await UserService.addUserPhone(userId, phone)

      res.status(200).json(user)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  // Delete
  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params

      const { refreshToken } = req.cookies

      if (!userId && !refreshToken) {
        return next(ApiErrors.BadRequest('invalid data'))
      }
      const user = await UserService.deleteUser(userId, refreshToken)

      res.clearCookie('refreshToken')

      res.status(200).json({ message: 'Successful delete', user })
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = new UserController()
