const User = require('../models/User')
const UserService = require('../services/UserService.js')

class UserController {
  async registration(req, res, next) {
    try {
      return await UserService.registration(req, res, next)
    } catch (e) {
      return next(e)
    }
  }

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

  async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email && !password) {
        return res.status(400).json({ message: 'invalid data' })
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

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies

      const userData = await UserService.refreshToken(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      res.clearCookie('refreshToken')

      return res.status(200).json({ message: 'Successful refresh token', userData })
    } catch (e) {
      return next(e)
    }
  }
}

module.exports = new UserController()
