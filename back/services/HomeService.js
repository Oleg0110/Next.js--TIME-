const ProductDto = require('../dtos/product-dto')
const OrderDto = require('../dtos/order-dto')
const Product = require('../models/Product')
const Order = require('../models/Order')

class HomeService {
  async getProductSale() {
    const saleProduct = await Product.aggregate([{ $match: { productSale: true } }, { $sample: { size: 6 } }])
    let dtoProducts = []

    saleProduct.map((data) => dtoProducts.push({ ...new ProductDto(data) }))

    return dtoProducts
  }

  async getUnconfirmedOrders() {
    const orders = await Order.find({ orderStatus: false })
    let dtoOrders = []

    orders.map((data) => dtoOrders.push({ ...new OrderDto(data) }))

    return dtoOrders
  }
}

module.exports = new HomeService()
