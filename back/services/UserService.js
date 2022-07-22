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
const FavoriteProduct = require('../models/FavoriteProduct')

class UserService {
  // Get
  async activate(activationLink, res, next) {
    const user = await User.findOne({ activationLink })

    if (!user) {
      return next(ApiErrors.BadRequest('Activate error'))
    }

    user.isActivate = true
    await user.save()
    return res.redirect(process.env.CLIENT_URL).json({ message: 'Successful registration' })
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

    return { user: { ...userDto }, tokens }
  }

  async getOrders(userId) {
    const orders = await Order.find({ userId })

    let dtoOrders = []

    orders.map((data) => dtoOrders.push({ ...new OrderDto(data) }))

    return dtoOrders
  }

  async checkPassword(userId, password) {
    const user = await User.findOne({ _id: userId })

    if (!user) {
      throw next(ApiErrors.BadRequest('Invalid email or password'))
    }

    const validPassword = await bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      throw next(ApiErrors.BadRequest('Invalid email or password'))
    }

    return true
  }

  async sendConfirmCode(userId, code) {
    const user = await User.findOne({ _id: userId })

    await MailService.sendCodeToConfirm(user, code)

    return true
  }

  // Post
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
      role: role.userRole,
      activationLink,
    })

    await user.save()

    await MailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`)

    return tokensMakeFunc(user, res, 'Please confirm your email')
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

  async createOrder(userOrderData, orderProducts, totalPrice, userId) {
    const givenSet = '1234567890'
    let orderNumber = '1'

    for (let i = 0; i < 7; i++) {
      let pos = Math.floor(Math.random() * givenSet.length)
      code += givenSet[pos]
    }

    const { userName, userSurname, userRegion, userAddress, userPhone, userCity, userEmail } = userOrderData

    let order

    if (userId === undefined) {
      order = new Order({
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
    } else {
      order = new Order({
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
        userId,
      })
    }

    await order.save()

    const dtoOrder = new OrderDto(order)

    await MailService.sendOrderToUs(dtoOrder.orderNumber, dtoOrder.userName, dtoOrder.userSurname)
    await MailService.sendOrderToUser(dtoOrder)

    return dtoOrder
  }

  // Patch
  async changeUserData(userId, value, changeWhat, next) {
    const resFunc = async () => {
      if (changeWhat === 'name') {
        return await User.findOneAndUpdate({ _id: userId }, { name: value }, { new: true })
      } else if (changeWhat === 'surname') {
        return await User.findOneAndUpdate({ _id: userId }, { surname: value }, { new: true })
      } else if (changeWhat === 'phone') {
        return await User.findOneAndUpdate({ _id: userId }, { phone: value }, { new: true })
      } else if (changeWhat === 'email') {
        const uniqueEmail = await User.findOne({ email: value })

        if (uniqueEmail) {
          throw ApiErrors.BadRequest(`This ${email} already using`)
        }

        const oldUser = await User.findOne({ _id: userId })
        const updateUser = await User.findOneAndUpdate({ _id: userId }, { email: value }, { new: true })

        const userDto = new UserDto(updateUser)

        await MailService.sendThatEmailChanged(userDto, oldUser.email)

        await MailService.sendThatEmailChanged(userDto, undefined)

        return updateUser
      } else if (changeWhat === 'password') {
        const hashPassword = await bcrypt.hashSync(value, 10)

        const user = await User.findByIdAndUpdate({ _id: userId }, { password: hashPassword }, { new: true })

        await MailService.sendThatPasswordChanged(user)

        return user
      } else {
        return next(ApiErrors.BadRequest('invalid data'))
      }
    }
    const user = await resFunc()

    const userDto = new UserDto(user)

    return userDto
  }

  async addUserPhone(userId, phone) {
    const user = await User.findOneAndUpdate({ _id: userId }, { phone }, { new: true })

    const userDto = new UserDto(user)

    return userDto
  }

  // Delete
  async deleteUser(userId, refreshToken) {
    const token = await TokenService.removeRefreshToken(refreshToken)
    const user = await User.findOne({ _id: userId })

    const deletedUser = await User.deleteOne({ _id: userId }, { new: true })

    const favorites = await FavoriteProduct.deleteMany({ userId })

    if ((!deletedUser.acknowledged, !favorites.acknowledged)) {
      throw next(ApiErrors.BadRequest('Invalid data'))
    }

    await MailService.sendThatDeleteAccount(user)

    return token
  }
}

module.exports = new UserService()
