const Product = require('../models/Product')
const Photo = require('../models/Photo')
const Order = require('../models/Order')
const AdminFunc = require('../utils/functions/AdminFunc')
const ProductDto = require('../dtos/product-dto')
const uuid = require('uuid')
const path = require('path')
const OrderDto = require('../dtos/order-dto')
const MailService = require('./MailService')

class AdminService {
  async getProducts(searchValue) {
    const productsData = await AdminFunc.regexFunc(searchValue, 'product')

    return productsData
  }

  async addPhoto(file, productId) {
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
    const productNumber = Number(`1${Math.floor(Math.random() * (999999999 - 100000000 + 1) + 1000000000)}`)

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
    searchValue
  ) {
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
        },
      },
      { new: true }
    )
    return await AdminFunc.regexFunc(searchValue, 'product')
  }

  async deleteProduct(productId, searchValue) {
    await Product.findOneAndDelete({ _id: productId })

    return await AdminFunc.regexFunc(searchValue, 'product')
  }

  async getUsers(searchValue) {
    return await AdminFunc.regexFunc(searchValue, 'user')
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
