const ProductDto = require('../dtos/product-dto')
const OrderDto = require('../dtos/order-dto')
const Product = require('../models/Product')
const Order = require('../models/Order')
const FavoriteProductDto = require('../dtos/favoriteProduc-dto')
const FavoriteProduct = require('../models/FavoriteProduct')

class HomeService {
  // Get
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

  async getFavorite(userId) {
    const favoriteProducts = await FavoriteProduct.find({ userId })

    let dtoValue = []

    favoriteProducts.map((data) => dtoValue.push({ ...new FavoriteProductDto(data) }))

    return dtoValue
  }

  async globalProductSearch(searchValue) {
    const regex = new RegExp(searchValue, 'i')

    let dtoValue = []

    const product = await Product.find({
      $or: [{ productNumber: { $regex: regex } }, { productName: { $regex: regex } }],
    }).limit(5)

    product.map((data) => dtoValue.push({ ...new ProductDto(data) }))

    return dtoValue
  }
}

module.exports = new HomeService()
