const HomeService = require('../services/HomeService')

class HomeController {
  async getShoeSale(req, res) {
    try {
      const shoeSale = await HomeService.getShoeSale()

      res.status(200).json(shoeSale)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = new HomeController()
