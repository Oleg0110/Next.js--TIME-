const { Router } = require('express')
const AdminController = require('../controllers/AdminController')
const { body } = require('express-validator')

const router = new Router()

router.get('/:searchValue', body('searchValue').isString(), AdminController.getProducts)
router.post(
  '/products-management/add-product',
  // body('productName', "Product name can't be empty").notEmpty().isString().isLength({ max: 30 }),
  // body('productFor', "Product For can't be empty, use 'men' or 'women'").notEmpty().isString().isLength({ max: 6, min: 4 }),
  // body('productPrice', "Product Price can't be empty and this is a number").notEmpty().isNumeric(),
  // body('productDiscountPrice', "Product Discount Price can't be empty and this is a number").notEmpty().isNumeric(),
  // body('productSale', 'Product Sale is boolean').notEmpty().isBoolean(),
  // body('productNew', 'Product New is boolean').notEmpty().isBoolean(),
  // body('productSize', "Product Size can't be empty and this is array of numbers").notEmpty().isNumeric().isArray(),
  // body('productColor', "Product Color can't be empty").notEmpty().isString().isLength({ max: 30 }),
  // body('productDescription', "Product Description can't be empty, min 10 and max 150 symbol")
  //   .notEmpty()
  //   .isString()
  //   .isLength({ min: 10, max: 150 }),
  // body('productStyleName', "Product Style Name can't be empty").notEmpty().isString().isLength({ max: 30 }),
  // body('productStyleMaterial', "Product Style Material can't be empty").notEmpty().isString().isLength({ max: 30 }),
  AdminController.addProduct
)
router.patch(
  '/products-management/change-product',
  body('productId').isString(),
  body('productSale', 'Product Sale is boolean').notEmpty().isBoolean(),
  body('productNew', 'Product New is boolean').notEmpty().isBoolean(),
  body('productSize', "Product Size can't be empty and this is array of numbers").notEmpty().isNumeric().isArray(),
  body('productPrice', "Product Price can't be empty and this is a number").notEmpty().isNumeric(),
  body('productDiscountPrice', "Product Discount Price can't be empty and this is a number").notEmpty().isNumeric(),
  AdminController.changeProduct
)
router.delete('/products-management/delete-product/:productId/:searchValue', AdminController.deleteProduct)
router.get('/customers-management/:searchValue', body('searchValue').isString(), AdminController.getCustomers)
// router.get('/orders-management', body('text').isString(), AdminController.getCustomers)

module.exports = router
