const CommonService = require('../services/CommonService')

class CommonController {
  async getProductSale(req, res) {
    try {
      const productSale = await CommonService.getProductSale()

      res.status(200).json(productSale)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async createOrder(req, res) {
    try {
      const { userOrderData, orderProducts, totalPrice } = req.body

      if (!userOrderData && !orderProducts && !totalPrice) {
        return next(ApiErrors.BadRequest('invalid data'))
      }
      const order = await CommonService.createOrder(userOrderData, orderProducts, totalPrice)

      res.status(200).json(order)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = new CommonController()
