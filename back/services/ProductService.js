const {
  chooseCurrentPageFunc,
  addPercentageFunc,
  colorFunc,
  styleFunc,
  materialFunc,
  priceFunc,
  sizeFunc,
} = require('../utils/ProductServiceFunc')

class ProductService {
  async getProducts(page) {
    return await chooseCurrentPageFunc(page)
  }

  async sortProduct(page, sort) {
    const currentPage = await chooseCurrentPageFunc(page)

    switch (sort) {
      case 'cheapToExpensive':
        return currentPage.sort((a, b) => a.productPrice - b.productPrice)

      case 'expensiveToCheap':
        return currentPage.sort((a, b) => b.productPrice - a.productPrice)

      case 'novelty':
        return currentPage.sort((a, b) => b.date - a.date)

      case 'maximumDiscount':
        return addPercentageFunc(page)

      default:
        break
    }
  }

  async filterProducts(page, filter) {
    const { productColor, productStyleName, productSize, productStyleMaterial, productPrice } = filter

    const currentPage = await chooseCurrentPageFunc(page)

    let filtered = []

    //Color
    productColor !== undefined && (filtered = colorFunc(currentPage, productColor))

    // Style
    productStyleName !== undefined && productColor
      ? (filtered = styleFunc(filtered, currentPage, productStyleName, true))
      : productStyleName !== undefined && (filtered = styleFunc(filtered, currentPage, productStyleName, false))

    // Material
    productStyleMaterial !== undefined && (productColor || productStyleName)
      ? (filtered = materialFunc(filtered, currentPage, productStyleMaterial, true))
      : productStyleMaterial !== undefined &&
        (filtered = materialFunc(filtered, currentPage, productStyleMaterial, false))

    // Price
    productPrice !== undefined && (productColor || productStyleName || productStyleMaterial)
      ? (filtered = priceFunc(filtered, currentPage, productPrice, true))
      : productPrice !== undefined && (filtered = priceFunc(filtered, currentPage, productPrice, false))

    //Size
    productSize !== undefined && (productColor || productStyleName || productStyleMaterial || productPrice)
      ? (filtered = sizeFunc(filtered, currentPage, productSize, true))
      : (filtered = productSize !== undefined && sizeFunc(filtered, currentPage, productSize, false))

    return filtered
  }
}

module.exports = new ProductService()
