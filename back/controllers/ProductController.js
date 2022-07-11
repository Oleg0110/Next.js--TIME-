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

  async getProductPhotos(req, res) {
    try {
      const { productId } = req.params

      if (!productId) res.status(400).json({ error: 'invalid data' })

      const product = await ProductService.getProductPhotos(productId)

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

  async getReview(req, res) {
    try {
      const { productId } = req.params

      if (!productId) res.status(400).json({ error: 'invalid data' })

      const reviews = await ProductService.getReview(productId)

      res.status(200).json(reviews)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getRecommended(req, res) {
    try {
      const { style, category } = req.params

      if (!style && !category) res.status(400).json({ error: 'invalid data' })

      const recommendedProducts = await ProductService.getRecommended(style, category)

      res.status(200).json(recommendedProducts)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async addReview(req, res) {
    try {
      const { comment, productId, userId, rating } = req.body

      if (!comment && !productId && !userId && !rating) res.status(400).json({ error: 'invalid data' })

      const reviews = await ProductService.addReview(comment, productId, userId, rating)

      res.status(200).json(reviews)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = new ProductController()
