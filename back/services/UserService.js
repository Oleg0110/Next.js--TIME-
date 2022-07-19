const Role = require('../models/Role')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const { validationResult } = require('express-validator')
const MailService = require('./MailService')
const tokensMakeFunc = require('../utils/UserServiceFunc')
const ApiErrors = require('../utils/apiErrors')
const TokenService = require('./TokenService')
const UserDto = require('../dtos/user-dto')
const OrderDto = require('../dtos/order-dto')
const Order = require('../models/Order')

class UserService {
  async registration(req, res, next) {
    const { name, surname, email, password } = req.body

    if (!name && !surname && !email && !password) {
      return next(ApiErrors.BadRequest('invalid data'))
    }
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return next(ApiErrors.BadRequest('Data entry error', errors.array()))
    }

    const uniqueEmail = await User.findOne({ email })

    if (uniqueEmail) {
      throw ApiErrors.BadRequest(`This ${email} already using`)
    }

    const hashPassword = await bcrypt.hashSync(password, 10)

    const activationLink = uuid.v4()

    const role = await Role.findOne({ userRole: 'user' })

    const user = new User({
      name,
      surname,
      email,
      password: hashPassword,
      role: [role.userRole],
      activationLink,
    })

    await user.save()

    await MailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`)

    return tokensMakeFunc(user, res, 'Please confirm your email')
  }

  async activate(activationLink, res, next) {
    const user = await User.findOne({ activationLink })

    if (!user) {
      return next(ApiErrors.BadRequest('Activate error'))
    }

    user.isActivate = true
    await user.save()
    return res.redirect(process.env.CLIENT_URL).json({ message: 'Successful registration' })
  }

  async login(email, password, res, next) {
    const user = await User.findOne({ email })

    if (!user) {
      throw next(ApiErrors.BadRequest('Invalid email or password'))
    }

    const validPassword = await bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      throw next(ApiErrors.BadRequest('Invalid email or password'))
    }

    return tokensMakeFunc(user, res, 'Successful login')
  }

  async logout(refreshToken) {
    const token = await TokenService.removeRefreshToken(refreshToken)
    return token
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw ApiErrors.NoTAuthorizedError()
    }

    const userData = await TokenService.validateRefreshToken(refreshToken)
    const token = await TokenService.findToken(refreshToken)

    if (!userData && !token) {
      throw ApiErrors.NoTAuthorizedError()
    }

    const user = await User.findOne({ _id: userData.id })

    const userDto = new UserDto(user)

    const tokens = TokenService.generationToken({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { user: { ...tokens, ...userDto } }
  }

  async createOrder(userOrderData, orderProducts, totalPrice) {
    const orderNumber = Number(`1${Math.floor(Math.random() * (999999 - 100000 + 1) + 1000000)}`)

    const { userName, userSurname, userRegion, userAddress, userPhone, userCity, userEmail } = userOrderData

    const order = new Order({
      orderNumber,
      userName,
      userSurname,
      userRegion,
      userAddress,
      userPhone,
      userCity,
      userEmail,
      orderProducts,
      totalPrice,
    })

    await order.save()

    const dtoOrder = new OrderDto(order)

    await MailService.sendOrderToUs(dtoOrder.orderNumber, dtoOrder.userName, dtoOrder.userSurname)
    await MailService.sendOrderToUser(dtoOrder)

    return dtoOrder
  }
}

module.exports = new UserService()
