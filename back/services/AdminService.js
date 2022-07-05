const Product = require('../models/Product')
const AdminFunc = require('../utils/functions/AdminFunc')
const uuid = require('uuid')
const path = require('path')

class AdminService {
  async getProducts(searchValue) {
    return await AdminFunc.regexFunc(searchValue, 'product')
  }

  async addProduct(
    productName,
    productFor,
    productNew,
    productPrice,
    productDiscountPrice,
    productSale,
    productSize,
    productColor,
    productDescription,
    productStyleName,
    productStyleMaterial,
    file
  ) {
    let productNumber = Number(`1${Math.floor(Math.random() * (999999999 - 100000000 + 1) + 1000000000)}`)
    const fileName = uuid.v4() + '.jpg'

    const product = new Product({
      productNumber,
      productName,
      productFor,
      productNew,
      productPrice,
      productDiscountPrice,
      productSale,
      productSize,
      productColor,
      productMainPictures: fileName,
      productDescription,
      productStyleName,
      productStyleMaterial,
    })

    const savedProduct = await product.save()

    file.mv(path.resolve(__dirname, '..', 'static', fileName))

    return savedProduct
  }

  async changeProduct(
    productId,
    productName,
    productFor,
    productNew,
    productPrice,
    productDiscountPrice,
    productSale,
    productSize,
    productColor,
    productDescription,
    productStyleName,
    productStyleMaterial,
    searchValue
  ) {
    const changedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        $set: {
          productId,
          productName,
          productFor,
          productNew,
          productPrice,
          productDiscountPrice,
          productSale,
          productSize,
          productColor,
          productDescription,
          productStyleName,
          productStyleMaterial,
        },
      },
      { new: true }
    )

    return await AdminFunc.regexFunc(searchValue, 'product')
  }

  async deleteProduct(productId, searchValue) {
    await Product.findOneAndDelete({ _id: productId })

    return await AdminFunc.regexFunc(searchValue, 'product')
  }

  async getCustomers(searchValue) {
    return await AdminFunc.regexFunc(searchValue, 'customer')
  }
}

module.exports = new AdminService()
