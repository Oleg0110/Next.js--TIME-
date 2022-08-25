const HomeService = require('../services/HomeService')

class HomeController {
  // Get
  async getProductSale(req, res) {
    try {
      const productSale = await HomeService.getProductSale()

      res.status(200).json(productSale)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getUnconfirmedOrders(req, res) {
    try {
      const orders = await HomeService.getUnconfirmedOrders()

      res.status(200).json(orders)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getFavorite(req, res) {
    try {
      const { userId } = req.params

      if (!userId) res.status(400).json({ error: 'invalid data' })

      const favorites = await HomeService.getFavorite(userId)

      res.status(200).json(favorites)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async globalProductSearch(req, res) {
    try {
      const { searchValue } = req.params

      if (!searchValue) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const products = await HomeService.globalProductSearch(searchValue)

      res.status(200).json(products)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = new HomeController()
