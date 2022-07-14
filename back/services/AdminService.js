const Product = require('../models/Product')
const Photo = require('../models/Photo')
const AdminFunc = require('../utils/functions/AdminFunc')
const ProductDto = require('../dtos/product-dto')
const uuid = require('uuid')
const path = require('path')

class AdminService {
  async getProducts(searchValue) {
    const productsData = await AdminFunc.regexFunc(searchValue, 'product')
    const productPhoto = []

    productsData.forEach(async (data) => {
      const photo = await Photo.findOne({ productId: data.id })
      productPhoto.push(photo)
    })

    const products = productsData.map((data) => {
      data, productPhoto
    })

    console.log(1, products)

    // return products
  }

  async addPhoto(file, productId) {
    const fileName = uuid.v4() + '.jpg'

    const photo = new Photo({
      productId,
      photoName: fileName,
    })

    const productPhoto = await photo.save()

    if (productPhoto) {
      file.mv(path.resolve(__dirname, '..', 'static', fileName))
    }

    return productPhoto
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
    const productNumber = Number(`1${Math.floor(Math.random() * (999999999 - 100000000 + 1) + 1000000000)}`)

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

    savedProduct && file.mv(path.resolve(__dirname, '..', 'static', fileName))

    const dtoValue = new ProductDto(savedProduct)

    return dtoValue
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

  async getUsers(searchValue) {
    return await AdminFunc.regexFunc(searchValue, 'user')
  }
}

module.exports = new AdminService()
