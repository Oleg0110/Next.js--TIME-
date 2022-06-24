const ProductService = require('../services/ProductService')

class ProductController {
  async getProducts(req, res) {
    try {
      const { page } = req.params

      if (!page) res.status(400).json({ error: 'invalid data' })

      const products = await ProductService.getProducts(page)

      res.status(200).json(products)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async sortProducts(req, res) {
    try {
      const { page, sort } = req.params

      if (!page && !sort) res.status(400).json({ error: 'invalid data' })

      const sortedProducts = await ProductsService.sortProducts(page, sort)

      res.status(200).json(sortedProducts)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async filterProducts(req, res) {
    try {
      // const filter = {
      //   productColor: ['black', 'white', 'pink', 'gray'],
      //   productStyleName: ['sandals', 'bootforts'],
      //   productStyleMaterial: ['fiber', 'leather'],
      //   productPrice: {
      //     from: 2500,
      //     to: 6000,
      //   },
      //   productSize: [40],
      // };
      const { page, filter } = req.params

      if (!page && !filter) res.status(400).json({ error: 'invalid data' })

      const filteredProducts = await ProductService.filterProducts(page, filter)

      res.status(200).json(filteredProducts)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = new ProductController()
