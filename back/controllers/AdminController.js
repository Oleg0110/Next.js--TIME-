const { json } = require('express')
const { validationResult } = require('express-validator')
const AdminService = require('../services/AdminService')
const ApiErrors = require('../utils/apiErrors')

class AdminController {
  async getProducts(req, res, next) {
    try {
      const { searchValue } = req.params

      if (!searchValue) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const products = await AdminService.getProducts(searchValue)

      res.status(200).json(products)
    } catch (e) {
      next(e)
    }
  }

  async addProduct(req, res, next) {
    try {
      const { file } = req.files
      const productData = JSON.parse(req.body.product)

      const {
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
      } = productData

      if (
        !productName &&
        !productFor &&
        !productNew &&
        !productPrice &&
        !productDiscountPrice &&
        !productSale &&
        !productSize &&
        !productColor &&
        !productDescription &&
        !productStyleName &&
        !productStyleMaterial &&
        !file
      ) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return next(ApiErrors.BadRequest('Data entry error', errors.array()))
      }

      console.log(productSize)
      const sortedSizes = productSize.sort()
      console.log(sortedSizes)

      const product = await AdminService.addProduct(
        productName,
        productFor,
        productNew,
        productPrice,
        productDiscountPrice,
        productSale,
        sortedSizes,
        productColor,
        productDescription,
        productStyleName,
        productStyleMaterial,
        file
      )

      res.status(200).json({ message: 'Successful added', product })
    } catch (e) {
      next(e)
    }
  }

  async changeProduct(req, res, next) {
    try {
      const { productId, product, searchValue } = req.body
      const {
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
      } = product

      if (
        !productId &&
        !productName &&
        !productFor &&
        !productNew &&
        !productSale &&
        !productPrice &&
        !productDiscountPrice &&
        !productSale &&
        !productSize &&
        !productColor &&
        !productDescription &&
        !productStyleName &&
        !productStyleMaterial &&
        !searchValue
      ) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const changedProduct = await AdminService.changeProduct(
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
      )

      res.status(200).json({ message: 'Product changed successfully', changedProduct })
    } catch (e) {
      next(e)
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { productId, searchValue } = req.params

      if (!productId && !searchValue) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const deletedProduct = await AdminService.deleteProduct(productId, searchValue)
      if (deletedProduct !== undefined || null) {
        res.status(200).json({ message: 'Product was deleted', deletedProduct })
      }
    } catch (e) {
      next(e)
    }
  }

  async getCustomers(req, res, next) {
    try {
      const { searchValue } = req.params

      if (!searchValue) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const users = await AdminService.getCustomers(searchValue)

      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new AdminController()
