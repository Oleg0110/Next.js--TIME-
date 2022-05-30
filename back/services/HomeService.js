const Shoe = require('../models/Shoe')

class HomeService {
  async getShoeSale() {
    const saleShoe = await Shoe.aggregate([{ $match: { shoeSale: true } }, { $sample: { size: 7 } }])

    return saleShoe
  }
}

module.exports = new HomeService()
