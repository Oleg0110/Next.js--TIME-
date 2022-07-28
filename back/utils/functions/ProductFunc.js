const ProductDto = require('../../dtos/product-dto')
const Product = require('../../models/Product')

const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
const color = ['black', 'gray', 'white', 'brown', 'blue', 'pink', 'green']
const style = ['boots', 'sneakers', 'loafers', 'bootforts', 'sandals', 'shoes', 'slippers']
const material = [
  'leather',
  'genuine leather',
  'eco leather',
  'suede',
  'nylon',
  'velor',
  'artificial materials',
  'fiber',
]
const priceFrom = 0
const priceTo = 15000

const comparativeFunc = (where, what) => {
  for (var i = 0; i < what.length; i++) {
    if (where === what[i]) return true
  }
  return false
}

const whatSortFunc = (sorting) => {
  switch (sorting) {
    case 'cheap to expensive':
      return { productPrice: 1 }

    case 'expensive to cheap':
      return { productPrice: -1 }

    case 'novelty':
      return { date: -1 }

    case 'maximum discount':
      return { productDiscountPrice: -1 }

    default:
      return {}
  }
}

class ProductFunc {
  chooseCurrentPageFunc = async (category, skip, filters, limit, sorting) => {
    // if (discount) {
    //   if (category === 'new')
    //     return await Product.find({ productNew: true, productDiscountPrice: { $gt: 0 } })
    //       .skip(skip)
    //       .limit(1)
    //   if (category === 'sale')
    //     return await Product.find({ productSale: true, productDiscountPrice: { $gt: 0 } })
    //       .skip(skip)
    //       .limit(1)

    //   return await Product.find({ productFor: category, productDiscountPrice: { $gt: 0 } })
    //     .skip(skip)
    //     .limit(1)
    // }

    // if (category === 'new') return await Product.find({ productNew: true }).skip(skip).limit(1)
    // if (category === 'sale') return await Product.find({ productSale: true }).skip(skip).limit(1)
    // const res = await Product.aggregate([
    //   { $match: { productColor: { $elemMatch: ['black', 'pink'] }, productFor: category } },
    // ])

    const sortData = whatSortFunc(sorting)

    const { productColor, productStyleName, productSize, productStyleMaterial, productPriceFrom, productPriceTo } =
      filters

    const isProductColor = productColor[0] === undefined ? color : productColor
    const isProductStyleName = productStyleName[0] === undefined ? style : productStyleName
    const isProductStyleMaterial = productStyleMaterial[0] === undefined ? material : productStyleMaterial
    const isProductSize = productSize[0] === undefined ? sizes : productSize

    const findProducts = await Product.find({
      productColor: isProductColor,
      productStyleName: isProductStyleName,
      productStyleMaterial: isProductStyleMaterial,
      productPrice: { $gte: productPriceFrom, $lte: productPriceTo },
      productSize: { $in: isProductSize },
      productFor: category,
    })
      .sort(sortData)
      .skip(skip)
      .limit(limit)

    const countProducts = await Product.find({
      productColor: isProductColor,
      productStyleName: isProductStyleName,
      productStyleMaterial: isProductStyleMaterial,
      productPrice: { $gte: productPriceFrom, $lte: productPriceTo },
      productSize: { $in: isProductSize },
      productFor: category,
    }).count()

    let products = []

    findProducts.map((data) => products.push({ ...new ProductDto(data) }))

    return { products, countProducts }
  }

  getNewSaleProducts = async (category, page, skip, filters, limit, sorting) => {
    const sortData = whatSortFunc(sorting)

    const { productColor, productStyleName, productSize, productStyleMaterial, productPriceFrom, productPriceTo } =
      filters

    const isProductColor = productColor[0] === undefined ? color : productColor
    const isProductStyleName = productStyleName[0] === undefined ? style : productStyleName
    const isProductStyleMaterial = productStyleMaterial[0] === undefined ? material : productStyleMaterial
    const isProductSize = productSize[0] === undefined ? sizes : productSize

    let findProducts
    let countProducts
    let products = []

    if (page === 'new') {
      findProducts = await Product.find({
        productNew: true,
        productColor: isProductColor,
        productStyleName: isProductStyleName,
        productStyleMaterial: isProductStyleMaterial,
        productPrice: { $gte: productPriceFrom, $lte: productPriceTo },
        productSize: { $in: isProductSize },
        productFor: category,
      })
        .sort(sortData)
        .skip(skip)
        .limit(limit)

      countProducts = await Product.find({
        productNew: true,
        productColor: isProductColor,
        productStyleName: isProductStyleName,
        productStyleMaterial: isProductStyleMaterial,
        productPrice: { $gte: productPriceFrom, $lte: productPriceTo },
        productSize: { $in: isProductSize },
        productFor: category,
      }).count()

      findProducts.map((data) => products.push({ ...new ProductDto(data) }))
    }

    if (page === 'sale') {
      const findProducts = await Product.find({
        productSale: true,
        productColor: isProductColor,
        productStyleName: isProductStyleName,
        productStyleMaterial: isProductStyleMaterial,
        productPrice: { $gte: productPriceFrom, $lte: productPriceTo },
        productSize: { $in: isProductSize },
        productFor: category,
      })
        .sort(sortData)
        .skip(skip)
        .limit(limit)

      countProducts = await Product.find({
        productSale: true,
        productColor: isProductColor,
        productStyleName: isProductStyleName,
        productStyleMaterial: isProductStyleMaterial,
        productPrice: { $gte: productPriceFrom, $lte: productPriceTo },
        productSize: { $in: isProductSize },
        productFor: category,
      }).count()

      findProducts.map((data) => products.push({ ...new ProductDto(data) }))
    }

    return { products, countProducts }
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

  filterCommonFunc = (products, filters) => {
    const { productColor, productStyleName, productSize, productStyleMaterial, productPriceFrom, productPriceTo } =
      filters

    const isProductColor = productColor[0] !== undefined
    const isProductStyleName = productStyleName[0] !== undefined
    const isProductStyleMaterial = productStyleMaterial[0] !== undefined
    const isProductSize = productSize[0] !== undefined
    const isProductPriceFrom = productPriceFrom !== undefined
    const isProductPriceTo = productPriceTo !== undefined

    let filtered = []

    //Color
    isProductColor ? (filtered = this.colorFunc(products, productColor)) : (filtered = products)

    // Style
    isProductStyleName && (filtered = this.styleFunc(filtered, productStyleName))

    // Material
    isProductStyleMaterial && (filtered = this.materialFunc(filtered, productStyleMaterial))

    // Price
    isProductPriceFrom &&
      (productPriceFrom > 0 || productPriceTo < 15000) &&
      isProductPriceTo &&
      (filtered = this.priceFunc(filtered, productPriceFrom, productPriceTo))

    //Size
    isProductSize && (filtered = this.sizeFunc(filtered, productSize))

    let dtoValue = []

    if (filtered[0] !== undefined) {
      filtered.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    }

    return dtoValue
  }
}

module.exports = new ProductFunc()
