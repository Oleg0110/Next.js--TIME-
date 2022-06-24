const Product = require('../models/Product')

module.exports = chooseCurrentPageFunc = async (page, discount) => {
  if (discount) {
    if (page === 'new') return await Product.find({ productNew: true, productDiscountPrice: { $gt: 0 } })
    if (page === 'sale') return await Product.find({ productSale: true, productDiscountPrice: { $gt: 0 } })

    return await Product.find({ productFor: page, productDiscountPrice: { $gt: 0 } })
  }

  if (page === 'new') return await Product.find({ productNew: true })
  if (page === 'sale') return await Product.find({ productSale: true })

  return await Product.find({ productFor: page })
}

module.exports = addPercentageFunc = async (page) => {
  const addPercentage = await chooseCurrentPageFunc(page, 'discount')
  const copyFns = JSON.parse(JSON.stringify(addPercentage))

  return copyFns
    .map((data) => {
      const percentageSale = Math.floor(100 - (data.productDiscountPrice * 100) / data.productPrice)

      return { ...data, percentageSale }
    })
    .sort((a, b) => b.percentageSale - a.percentageSale)
}

module.exports = comparativeFunc = (where, what) => {
  for (var i = 0; i < what.length; i++) {
    if (where === what[i]) return true
  }
  return false
}

module.exports = includesSizeFunc = (where, what) => {
  for (var i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) === -1) return false
  }
  return true
}

module.exports = colorFunc = (currentPage, productColor) => {
  let currentData = []

  currentPage.map((data) => comparativeFunc(data.productColor, productColor) && currentData.push(data))
  return currentData
}

module.exports = styleFunc = (filtered, currentPage, productStyleName, value) => {
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

module.exports = materialFunc = (filtered, currentPage, productStyleMaterial, value) => {
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

module.exports = priceFunc = (filtered, currentPage, productPrice, value) => {
  const { from = 0, to = 10000 } = productPrice
  let currentData

  value && (currentData = filtered.filter((f) => f.productPrice >= from && f.productPrice <= to))

  !value && (currentData = currentPage.filter((f) => f.productPrice >= from && f.productPrice <= to))

  return currentData
}

module.exports = sizeFunc = (filtered, currentPage, productSize, value) => {
  let currentData = []

  value && filtered.map((data) => includesSizeFunc(data.productSize, productSize) && currentData.push(data))

  !value && currentPage.map((data) => includesSizeFunc(data.productSize, productSize) && currentData.push(data))

  return currentData
}
