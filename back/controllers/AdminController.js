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

  async addPhoto(req, res, next) {
    try {
      const { file } = req.files
      const { productId } = req.body

      if (!file && !productId) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const photos = await AdminService.addPhoto(file, productId)

      res.status(200).json(photos)
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

      const sortedSizes = productSize.sort()

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
      const { file } = req.files
      const { productId, searchValue } = req.body

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
        !searchValue &&
        !file
      ) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const sortedSizes = productSize.sort()

      const resData = await AdminService.changeProduct(
        productId,
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
        searchValue,
        file
      )

      res.status(200).json({
        message: 'Product changed successfully',
        changedProduct: resData.dtoValue,
        products: resData.products,
      })
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

  async getUsers(req, res, next) {
    try {
      const { searchValue } = req.params

      if (!searchValue) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const users = await AdminService.getUsers(searchValue)

      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }

  async getUserInTeam(req, res, next) {
    try {
      const users = await AdminService.getUserInTeam()

      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }

  async userAssignment(req, res, next) {
    try {
      const { userId } = req.body

      if (!userId) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const users = await AdminService.userAssignment(userId)

      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }

  async removeAssignmentAdmin(req, res, next) {
    try {
      const { userId } = req.body

      if (!userId) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const users = await AdminService.removeAssignmentAdmin(userId)

      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }

  async changeOrderStatus(req, res, next) {
    try {
      const { orderId, orderStatus } = req.body

      if (!orderId && !orderStatus) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const changedOrder = await AdminService.changeOrderStatus(orderId, orderStatus, next)

      res.status(200).json(changedOrder)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getConfirmedOrders(req, res) {
    try {
      const { searchValue } = req.params

      if (!searchValue) {
        return next(ApiErrors.BadRequest('invalid data'))
      }

      const orders = await AdminService.getConfirmedOrders(searchValue)

      res.status(200).json(orders)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

module.exports = new AdminController()
