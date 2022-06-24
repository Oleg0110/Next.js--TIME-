const HomeService = require('../services/HomeService')

class HomeController {
  async getProductSale(req, res) {
    try {
      const productSale = await HomeService.getProductSale()

      res.status(200).json(productSale)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = new HomeController()
