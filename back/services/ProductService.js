const ProductFunc = require('../utils/functions/ProductFunc')
const ProductDto = require('../dtos/product-dto')
const PhotoDto = require('../dtos/photo-dto')
const ReviewDto = require('../dtos/review-dto')
const Product = require('../models/Product')
const Photo = require('../models/Photo')
const User = require('../models/User')
const Review = require('../models/Review')
const FavoriteProduct = require('../models/FavoriteProduct')
const FavoriteProductDto = require('../dtos/favoriteProduc-dto')

class ProductService {
  // Get
  async getProduct(productId) {
    const product = await Product.findOne({ _id: productId })

    const dtoValue = new ProductDto(product)
    return dtoValue
  }

  async getProductPhotos(productId) {
    const productPhotos = await Photo.find({ productId: productId })

    let dtoValue = []

    productPhotos.map((data) => dtoValue.push({ ...new PhotoDto(data) }))

    return dtoValue
  }

  async getProducts(category, page, filters, limit, sorting) {
    let products

    if (page === 'new' || page === 'sale') {
      products = await ProductFunc.getNewSaleProducts(category, page, 0, filters, limit, sorting)
    } else {
      products = await ProductFunc.chooseCurrentPageFunc(category, 0, filters, limit, sorting)
    }

    return products
  }

  async paginationProducts(category, page, filters, start, limit, sorting) {
    let products

    if (page === 'new' || page === 'sale') {
      products = await ProductFunc.getNewSaleProducts(category, page, start, filters, limit, sorting)
    } else {
      products = await ProductFunc.chooseCurrentPageFunc(category, start, filters, limit, sorting)
    }

    return products
  }

  async getReview(productId) {
    const reviews = await Review.find({ productId })
    let dtoValue = []

    reviews.map((data) => dtoValue.push({ ...new ReviewDto(data) }))

    const reviewsArr = dtoValue
      .map((data) => {
        let currentDate = Date.parse(new Date())
        let days = Math.round((currentDate - Date.parse(data.date)) / 86400000)
        return { ...data, date: days }
      })
      .sort((a, b) => a.date - b.date)

    return reviewsArr
  }

  async getRecommended(style, category) {
    const recommendedProduct = await Product.aggregate([
      {
        $match: {
          productFor: category,
          //  productStyleName: style
        },
      },
      { $sample: { size: 6 } },
    ])

    let dtoValue = []

    recommendedProduct.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    return dtoValue
  }

  // Post
  async addReview(comment, productId, userId, rating) {
    const user = await User.findById({ _id: userId })
    const userName = `${user.name} ${user.surname}`

    const review = new Review({ productId, userId, userName, comment, rating })

    await review.save()

    const reviews = await Review.find({ productId })
    let dtoValue = []

    reviews.map((data) => dtoValue.push({ ...new ReviewDto(data) }))

    const reviewsArr = dtoValue
      .map((data) => {
        let currentDate = Date.parse(new Date())
        let days = Math.round((currentDate - Date.parse(data.date)) / 86400000)
        return { ...data, date: days }
      })
      .sort((a, b) => a.date - b.date)

    return reviewsArr
  }

  async addProductToFavorite(productId, userId) {
    const product = new ProductDto(await Product.findById({ _id: productId }))

    const favoriteProduct = new FavoriteProduct({
      userId,
      product,
    })

    await favoriteProduct.save()

    const favoriteProducts = await FavoriteProduct.find({ userId })

    let dtoValue = []

    favoriteProducts.map((data) => dtoValue.push({ ...new FavoriteProductDto(data) }))

    return dtoValue
  }

  // Delete
  async removeProductToFavorite(favoriteId, userId) {
    await FavoriteProduct.findByIdAndDelete({ _id: favoriteId })

    const favorites = await FavoriteProduct.find({ userId })

    let dtoValue = []

    favorites.map((data) => dtoValue.push({ ...new FavoriteProductDto(data) }))

    return dtoValue
  }
}

module.exports = new ProductService()
