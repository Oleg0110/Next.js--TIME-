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

  addPercentageFunc = async (page) => {
    const addPercentage = await chooseCurrentPageFunc(page, 'discount')
    const copyFns = JSON.parse(JSON.stringify(addPercentage))

    return copyFns
      .map((data) => {
        const percentageSale = Math.floor(100 - (data.productDiscountPrice * 100) / data.productPrice)

        return { ...data, percentageSale }
      })
      .sort((a, b) => b.percentageSale - a.percentageSale)
  }

  colorFunc = (currentPage, productColor) => {
    let currentData = []

    currentPage.map((data) => comparativeFunc(data.productColor, productColor) && currentData.push(data))
    return currentData
  }

  styleFunc = (filtered, currentPage, productStyleName, value) => {
    let currentData = []

    value &&
      filtered.map((data) => {
        comparativeFunc(data.productStyleName, productStyleName) && currentData.push(data)
      })

    !value &&
      currentPage.map((data) => {
        comparativeFunc(data.productStyleName, productStyleName) && currentData.push(data)
      })
    return currentData
  }

  materialFunc = (filtered, currentPage, productStyleMaterial, value) => {
    let currentData = []

    value &&
      filtered.map((data) => {
        comparativeFunc(data.productStyleMaterial, productStyleMaterial) && currentData.push(data)
      })

    !value &&
      currentPage.map((data) => {
        comparativeFunc(data.productStyleMaterial, productStyleMaterial) && currentData.push(data)
      })

    return currentData
  }

  priceFunc = (filtered, currentPage, productPriceFrom, productPriceTo, value) => {
    let currentData

    value &&
      (currentData = filtered.filter((f) => f.productPrice >= productPriceFrom && f.productPrice <= productPriceTo))

    !value &&
      (currentData = currentPage.filter((f) => f.productPrice >= productPriceFrom && f.productPrice <= productPriceTo))

    return currentData
  }

  sizeFunc = (filtered, currentPage, productSize, value) => {
    let currentData = []

    const size = []
    productSize.map((data) => size.push(+data))

    value &&
      filtered.map(
        (data) => data.productSize.filter((i) => size.includes(i))[0] !== undefined && currentData.push(data)
      )

    !value &&
      currentPage.map(
        (data) => data.productSize.filter((i) => size.includes(i))[0] !== undefined && currentData.push(data)
      )

    return currentData
  }
}

module.exports = new ProductFunc()
