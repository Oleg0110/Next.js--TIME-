const Product = require('../models/Product')
const Photo = require('../models/Photo')
const Order = require('../models/Order')
const AdminFunc = require('../utils/functions/AdminFunc')
const ProductDto = require('../dtos/product-dto')
const uuid = require('uuid')
const path = require('path')
const OrderDto = require('../dtos/order-dto')
const MailService = require('./MailService')
const User = require('../models/User')
const UserDto = require('../dtos/user-dto')
const fs = require('fs')
const ApiErrors = require('../utils/apiErrors')

class AdminService {
  async getProducts(searchValue) {
    const productsData = await AdminFunc.regexFunc(searchValue, 'product')

    return productsData
  }

  async addPhoto(file, productId) {
    const findFiles = await Photo.find({ productId })

    try {
      for (let i = 0; i < findFiles.length; i++) {
        if (fs.existsSync(`static/${findFiles[i].photoName}`)) {
          fs.unlink(`static/${findFiles[i].photoName}`, (err) => {
            if (err) return console.log(err)

            console.log('File deleted!')
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
    await Photo.deleteMany({ productId })

    const fileName = uuid.v4() + '.jpg'

    const photo = new Photo({
      productId,
      photoName: fileName,
    })

    const productPhoto = await photo.save()

    if (productPhoto) {
      file.mv(path.resolve(__dirname, '..', 'static', fileName))
    }

    return productPhoto
  }

  async addProduct(
    productName,
    productFor,
    productNew,
    productPrice,
    productDiscountPrice,
    productSale,
    productSize,
    productColor,
    productDescription,
    productStyleName,
    productStyleMaterial,
    file
  ) {
    const givenSet = '1234567890'
    let productNumber = '1'

    for (let i = 0; i < 9; i++) {
      let pos = Math.floor(Math.random() * givenSet.length)
      productNumber += givenSet[pos]
    }

    const fileName = uuid.v4() + '.jpg'

    const product = new Product({
      productNumber,
      productName,
      productFor,
      productNew,
      productPrice,
      productDiscountPrice,
      productSale,
      productSize,
      productColor,
      productMainPictures: fileName,
      productDescription,
      productStyleName,
      productStyleMaterial,
    })

    const savedProduct = await product.save()

    savedProduct && file.mv(path.resolve(__dirname, '..', 'static', fileName))

    const dtoValue = new ProductDto(savedProduct)

    return dtoValue
  }

  async changeProduct(
    productId,
    productName,
    productFor,
    productNew,
    productPrice,
    productDiscountPrice,
    productSale,
    productSize,
    productColor,
    productDescription,
    productStyleName,
    productStyleMaterial,
    searchValue,
    file
  ) {
    const findProduct = await Product.findById({ _id: productId })

    try {
      if (fs.existsSync(`static/${findProduct.productMainPictures}`)) {
        fs.unlink(`static/${findProduct.productMainPictures}`, (err) => {
          if (err) return console.log(err)

          console.log('File deleted!')
        })
      }
    } catch (e) {
      console.log(e)
    }

    const fileName = uuid.v4() + '.jpg'

    const changedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        $set: {
          productId,
          productName,
          productFor,
          productNew,
          productPrice,
          productDiscountPrice,
          productSale,
          productSize,
          productColor,
          productDescription,
          productStyleName,
          productStyleMaterial,
          productMainPictures: fileName,
        },
      },
      { new: true }
    )

    if (changedProduct.productMainPictures !== fileName) {
      throw next(ApiErrors.BadRequest('Invalid data'))
    }

    file.mv(path.resolve(__dirname, '..', 'static', fileName))

    const products = await AdminFunc.regexFunc(searchValue, 'product')
    const dtoValue = new ProductDto(changedProduct)

    return { products, dtoValue }
  }

  async deleteProduct(productId, searchValue) {
    await Product.findOneAndDelete({ _id: productId })

    return await AdminFunc.regexFunc(searchValue, 'product')
  }

  async getUsers(searchValue) {
    return await AdminFunc.regexFunc(searchValue, 'user')
  }

  async getUserInTeam() {
    const users = await User.find({ role: ['admin', 'owner'] })

    let dtoValue = []

    users.map((data) => dtoValue.push({ ...new UserDto(data) }))

    return dtoValue
  }

  async userAssignment(userId, next) {
    const user = await User.findOneAndUpdate({ _id: userId }, { role: 'admin' }, { new: true })

    if (user.role === 'user') {
      return next(ApiErrors.BadRequest('invalid data'))
    }

    await MailService.sendAssignUser(user)

    const users = await User.find({ role: ['admin', 'owner'] })

    let dtoValue = []

    users.map((data) => dtoValue.push({ ...new UserDto(data) }))

    return dtoValue
  }

  async removeAssignmentAdmin(userId, next) {
    const user = await User.findOneAndUpdate({ _id: userId }, { role: 'user' }, { new: true })

    if (user.role === 'admin') {
      return next(ApiErrors.BadRequest('invalid data'))
    }

    await MailService.sendRemoveAssignUser(user)

    const users = await User.find({ role: ['admin', 'owner'] })

    let dtoValue = []

    users.map((data) => dtoValue.push({ ...new UserDto(data) }))

    return dtoValue
  }

  async changeOrderStatus(orderId, status, next) {
    const order = await Order.findOneAndUpdate({ _id: orderId }, { orderStatus: status }, { new: true })

    if (order.orderStatus !== true) {
      return next(ApiErrors.BadRequest('invalid data'))
    }

    const dtoOrder = new OrderDto(order)

    await MailService.sendConfirmOrderMail(dtoOrder)

    let dtoOrders = []
    const orders = await Order.find({ orderStatus: false })

    orders.map((data) => dtoOrders.push({ ...new OrderDto(data) }))

    return dtoOrders
  }

  async getConfirmedOrders(searchValue) {
    return await AdminFunc.regexFunc(searchValue, 'order')
  }
}

module.exports = new AdminService()
