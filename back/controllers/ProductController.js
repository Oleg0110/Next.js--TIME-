const ProductService = require('../services/ProductService')

class ProductController {
  async getProduct(req, res) {
    try {
      const { productId } = req.params

      if (!productId) res.status(400).json({ error: 'invalid data' })

      const product = await ProductService.getProduct(productId)

      res.status(200).json(product)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getProducts(req, res) {
    try {
      const { category } = req.params

      if (!category) res.status(400).json({ error: 'invalid data' })

      const products = await ProductService.getProducts(category)

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
      const { category, filter } = req.query

      const filters = JSON.parse(filter)

      if (!category && !filter) res.status(400).json({ error: 'invalid data' })

      const filteredProducts = await ProductService.filterProducts(category, filters)

      res.status(200).json(filteredProducts)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = new ProductController()
