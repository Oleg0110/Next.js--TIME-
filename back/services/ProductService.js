const ProductFunc = require('../utils/functions/ProductFunc')
const ProductDto = require('../dtos/product-dto')
const PhotoDto = require('../dtos/photo-dto')
const ReviewDto = require('../dtos/review-dto')
const Product = require('../models/Product')
const Photo = require('../models/Photo')
const User = require('../models/User')
const Review = require('../models/Review')

class ProductService {
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

  async getProducts(category, page) {
    let product
    if (page === 'new' || page === 'sale') {
      product = await ProductFunc.getNewSaleProducts(category, page)
    } else {
      product = await ProductFunc.chooseCurrentPageFunc(category)
    }
    let dtoValue = []

    product.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    return dtoValue
  }

  async filterProducts(category, filters, page) {
    const { productColor, productStyleName, productSize, productStyleMaterial, productPriceFrom, productPriceTo } =
      filters

    const isProductColor = productColor[0] !== undefined
    const isProductStyleName = productStyleName[0] !== undefined
    const isProductStyleMaterial = productStyleMaterial[0] !== undefined
    const isProductSize = productSize[0] !== undefined

    let currentPage
    if (page === 'new' || page === 'sale') {
      currentPage = await ProductFunc.getNewSaleProducts(category, page)
    } else {
      currentPage = await ProductFunc.chooseCurrentPageFunc(category)
    }

    let filtered = []

    //Color
    isProductColor ? (filtered = ProductFunc.colorFunc(currentPage, productColor)) : (filtered = currentPage)

    // Style
    isProductStyleName && (filtered = ProductFunc.styleFunc(filtered, productStyleName))

    // Material
    isProductStyleMaterial && (filtered = ProductFunc.materialFunc(filtered, productStyleMaterial))

    // Price
    productPriceFrom !== undefined &&
      productPriceTo !== undefined &&
      (filtered = ProductFunc.priceFunc(filtered, productPriceFrom, productPriceTo))

    //Size
    isProductSize && (filtered = ProductFunc.sizeFunc(filtered, productSize))

    let dtoValue = []

    if (filtered[0] !== undefined) {
      filtered.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    }

    return dtoValue
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

    let count = 0

    for (let i = 0; i < reviewsArr.length; i++) {
      const rev = reviewsArr[i]
      count += rev.rating
    }

    const averageRating = Math.round(count / reviewsArr.length)

    return reviewsArr
  }

  async getRecommended(style, category) {
    const recommendedProduct = await Product.aggregate([
      { $match: { productFor: category, productStyleName: style } },
      { $sample: { size: 6 } },
    ])

    let dtoValue = []

    recommendedProduct.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    return dtoValue
  }

  async addReview(comment, productId, userId, rating) {
    const user = await User.findById({ _id: userId })
    const userName = `${user.name} ${user.surname}`

    const review = new Review({ productId, userId, userName, comment, rating })

    await review.save()

    const reviews = await Review.find({ productId })
    let dtoValue = []

    reviews.map((data) => dtoValue.push({ ...new ReviewDto(data) }))

    return dtoValue
  }
}

module.exports = new ProductService()
