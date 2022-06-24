const Product = require('../models/Product')
const User = require('../models/User')

class AdminService {
  async getProducts(text) {
    const regex = new RegExp(text, 'i')

    const product = await Product.find({
      $or: [{ productNumber: { $regex: regex } }],
    }).limit(10)

    return product
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
    picture
  ) {
    let productNumber = Number(`1${Math.floor(Math.random() * (999999999 - 100000000 + 1) + 1000000000)}`)

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
      productDescription,
      productStyleName,
      productStyleMaterial,
    })

    await product.save()
    return
  }

  async changeProduct(productId, productPrice, productDiscountPrice, productSale, productNew, productSize) {
    const changedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { productPrice, productDiscountPrice, productSale, productNew, productSize } },
      { new: true }
    )

    return changedProduct
  }

  async deleteProduct(productId) {
    const deletedProduct = await Product.findOneAndDelete({ _id: productId })

    return deletedProduct
  }

  async getCustomers(text) {
    const regex = new RegExp(text, 'i')

    const users = await User.find({
      $or: [{ name: { $regex: regex } }, { surname: { $regex: regex } }, { email: { $regex: regex } }],
    }).limit(10)

    return users
  }
}

module.exports = new AdminService()
