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
        shoeFor,
        shoeNew,
        shoePrice,
        shoeDiscountPrice,
        shoeSale,
        shoeSize,
        shoeColor,
        shoeDescription,
        shoeStyleName,
        shoeStyleMaterial,
      } = req.body

      if (
        !productName &&
        !shoeFor &&
        !shoeNew &&
        !shoePrice &&
        !shoeDiscountPrice &&
        !shoeSale &&
        !shoeSize &&
        !shoeColor &&
        !shoeDescription &&
        !shoeStyleName &&
        !shoeStyleMaterial
      ) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return next(ApiErrors.BadRequest('Data entry error', errors.array()))
      }

      const shoe = await AdminService.addProduct(
        productName,
        shoeFor,
        shoeNew,
        shoePrice,
        shoeDiscountPrice,
        shoeSale,
        shoeSize,
        shoeColor,
        shoeDescription,
        shoeStyleName,
        shoeStyleMaterial,
        req.files.shoeMainPictures
      )

      res.status(200).json({ message: 'Successful added', shoe })
    } catch (e) {
      next(e)
    }
  }

  async changeProduct(req, res, next) {
    try {
      const { productId, shoePrice, shoeDiscountPrice, shoeSale, shoeNew, shoeSize } = req.body

      if (!productId && !shoePrice && !shoeDiscountPrice && !shoeSale && !shoeNew && !shoeSize) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const changedProduct = await AdminService.changeProduct(
        productId,
        shoePrice,
        shoeDiscountPrice,
        shoeSale,
        shoeNew,
        shoeSize
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

  async getUsers(req, res, next) {
    try {
      const { text } = req.params

      if (!text) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const users = await AdminService.getUsers(text)

      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new AdminController()
