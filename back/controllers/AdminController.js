const { validationResult } = require('express-validator')
const AdminService = require('../services/AdminService')
const ApiErrors = require('../utils/apiErrors')

class AdminController {
  async getProducts(req, res, next) {
    try {
      const { text } = req.params

      if (!text) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const products = await AdminService.getProducts(text)

      res.status(200).json(products)
    } catch (e) {
      next(e)
    }
  }

  async addProduct(req, res, next) {
    try {
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
      } = req.body
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
        !productStyleMaterial
      ) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return next(ApiErrors.BadRequest('Data entry error', errors.array()))
      }

      const product = await AdminService.addProduct(
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
        productStyleMaterial
        // req.files.productMainPictures
      )

      res.status(200).json({ message: 'Successful added', product })
    } catch (e) {
      next(e)
    }
  }

  async changeProduct(req, res, next) {
    try {
      const { productId, productPrice, productDiscountPrice, productSale, productNew, productSize } = req.body

      if (!productId && !productPrice && !productDiscountPrice && !productSale && !productNew && !productSize) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const changedProduct = await AdminService.changeProduct(
        productId,
        productPrice,
        productDiscountPrice,
        productSale,
        productNew,
        productSize
      )

      res.status(200).json(changedProduct)
    } catch (e) {
      next(e)
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { productId } = req.body

      if (!productId) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const deletedProduct = await AdminService.deleteProduct(productId)
      if (deletedProduct !== undefined || null) {
        res.status(200).json({ message: 'Product was deleted' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getCustomers(req, res, next) {
    try {
      const { text } = req.params

      if (!text) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const users = await AdminService.getCustomers(text)

      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new AdminController()
