const ProductDto = require('../dtos/product-dto')
const OrderDto = require('../dtos/order-dto')
const Product = require('../models/Product')
const Order = require('../models/Order')

class CommonService {
  async getProductSale() {
    const saleProduct = await Product.aggregate([{ $match: { productSale: true } }, { $sample: { size: 6 } }])
    let dtoProducts = []

    saleProduct.map((data) => dtoProducts.push({ ...new ProductDto(data) }))

    return dtoProducts
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

    return dtoOrder
  }
}

module.exports = new CommonService()
