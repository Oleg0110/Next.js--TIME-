const Product = require('../../models/Product')

const comparativeFunc = (where, what) => {
  for (var i = 0; i < what.length; i++) {
    if (where === what[i]) return true
  }
  return false
}

class ProductFunc {
  chooseCurrentPageFunc = async (category, discount) => {
    if (discount) {
      if (category === 'new') return await Product.find({ productNew: true, productDiscountPrice: { $gt: 0 } })
      if (category === 'sale') return await Product.find({ productSale: true, productDiscountPrice: { $gt: 0 } })

      return await Product.find({ productFor: category, productDiscountPrice: { $gt: 0 } })
    }

    if (category === 'new') return await Product.find({ productNew: true })
    if (category === 'sale') return await Product.find({ productSale: true })

    return await Product.find({ productFor: category })
  }

  getNewSaleProducts = async (category, page) => {
    if (page === 'new') return await Product.find({ productNew: true, productFor: category })
    if (page === 'sale') return await Product.find({ productSale: true, productFor: category })
  }

  colorFunc = (currentPage, productColor) => {
    let currentData = []

    currentPage.map((data) => comparativeFunc(data.productColor, productColor) && currentData.push(data))
    return currentData
  }

  styleFunc = (filtered, productStyleName) => {
    let currentData = []

    filtered.map((data) => {
      comparativeFunc(data.productStyleName, productStyleName) && currentData.push(data)
    })

    return currentData
  }

  materialFunc = (filtered, productStyleMaterial) => {
    let currentData = []

    filtered.map((data) => {
      comparativeFunc(data.productStyleMaterial, productStyleMaterial) && currentData.push(data)
    })

    return currentData
  }

  priceFunc = (filtered, productPriceFrom, productPriceTo) => {
    let currentData = []

    filtered.map((data) => {
      if (data.productSale === true) {
        return (
          data.productDiscountPrice >= productPriceFrom &&
          data.productDiscountPrice <= productPriceTo &&
          currentData.push(data)
        )
      } else {
        return data.productPrice >= productPriceFrom && data.productPrice <= productPriceTo && currentData.push(data)
      }
    })

    return currentData
  }

  sizeFunc = (filtered, productSize) => {
    let currentData = []

    const size = []
    productSize.map((data) => size.push(+data))

    filtered.map((data) => data.productSize.filter((i) => size.includes(i))[0] !== undefined && currentData.push(data))

    return currentData
  }
}

module.exports = new ProductFunc()
