const ProductDto = require('../dtos/product-dtos')
const Product = require('../models/Product')

class HomeService {
  async getProductSale() {
    const saleProduct = await Product.aggregate([{ $match: { productSale: true } }, { $sample: { size: 6 } }])
    let dtoProducts = []

    saleProduct.map((data) => dtoProducts.push({ ...new ProductDto(data) }))

    return dtoProducts
  }
}

module.exports = new HomeService()
