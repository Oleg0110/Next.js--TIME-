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

  async getProducts(category) {
    const product = await ProductFunc.chooseCurrentPageFunc(category)

    let dtoValue = []

    product.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    return dtoValue
  }

  async filterProducts(category, filters) {
    const { productColor, productStyleName, productSize, productStyleMaterial, productPriceFrom, productPriceTo } =
      filters

    const currentPage = await ProductFunc.chooseCurrentPageFunc(category)

    let filtered = []

    //Color
    productColor[0] !== undefined
      ? (filtered = ProductFunc.colorFunc(currentPage, productColor))
      : (filtered = currentPage)

    // Style
    productStyleName[0] !== undefined && productColor
      ? (filtered = ProductFunc.styleFunc(filtered, currentPage, productStyleName, true))
      : productStyleName[0] !== undefined &&
        (filtered = ProductFunc.styleFunc(filtered, currentPage, productStyleName, false))

    // Material
    productStyleMaterial[0] !== undefined && (productColor || productStyleName)
      ? (filtered = ProductFunc.materialFunc(filtered, currentPage, productStyleMaterial, true))
      : productStyleMaterial[0] !== undefined &&
        (filtered = ProductFunc.materialFunc(filtered, currentPage, productStyleMaterial, false))

    // Price
    productPriceFrom && productPriceTo !== undefined && (productColor || productStyleName || productStyleMaterial)
      ? (filtered = ProductFunc.priceFunc(filtered, currentPage, productPriceFrom, productPriceTo, true))
      : productPriceFrom &&
        productPriceTo !== undefined &&
        (filtered = ProductFunc.priceFunc(filtered, currentPage, productPriceFrom, productPriceTo, false))

    //Size
    productSize[0] !== undefined &&
    (productColor || productStyleName || productStyleMaterial || productPriceFrom || productPriceTo)
      ? (filtered = ProductFunc.sizeFunc(filtered, currentPage, productSize, true))
      : productSize[0] !== undefined && (filtered = ProductFunc.sizeFunc(filtered, currentPage, productSize, false))

    let dtoValue = []

    if (filtered[0] !== undefined) {
      filtered.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    } else {
      currentPage.map((data) => dtoValue.push({ ...new ProductDto(data) }))
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
