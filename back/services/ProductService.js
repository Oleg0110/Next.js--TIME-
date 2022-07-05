const ProductFunc = require('../utils/functions/ProductFunc')
const ProductDto = require('../dtos/product-dtos')
const Product = require('../models/Product')

class ProductService {
  async getProduct(productId) {
    const product = await Product.findOne({ _id: productId })

    const dtoValue = new ProductDto(product)
    return dtoValue
  }

  async getProducts(category) {
    const product = await ProductFunc.chooseCurrentPageFunc(category)

    let dtoValue = []

    product.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    return dtoValue
  }

  async sortProduct(page, sort) {
    const currentPage = await ProductFunc.chooseCurrentPageFunc(page)

    switch (sort) {
      case 'cheapToExpensive':
        return currentPage.sort((a, b) => a.productPrice - b.productPrice)

      case 'expensiveToCheap':
        return currentPage.sort((a, b) => b.productPrice - a.productPrice)

      case 'novelty':
        return currentPage.sort((a, b) => b.date - a.date)

      case 'maximumDiscount':
        return ProductFunc.addPercentageFunc(page)

      default:
        break
    }
  }

  async filterProducts(category, filters) {
    const {
      productColor,
      productStyleName,
      productSize,
      productStyleMaterial,
      productPrice,
      productPriceFrom,
      productPriceTo,
    } = filters

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
      : productPrice !== undefined &&
        (filtered = ProductFunc.priceFunc(filtered, currentPage, productPriceFrom, productPriceTo, false))

    //Size
    productSize[0] !== undefined && (productColor || productStyleName || productStyleMaterial || productPrice)
      ? (filtered = ProductFunc.sizeFunc(filtered, currentPage, productSize, true))
      : (filtered = productSize[0] !== undefined && ProductFunc.sizeFunc(filtered, currentPage, productSize, false))
    console.log(1, filtered)

    let dtoValue = []

    if (filtered[0] !== undefined) {
      filtered.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    } else {
      currentPage.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    }

    return dtoValue
  }
}

module.exports = new ProductService()
