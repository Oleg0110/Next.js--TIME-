const { Router } = require('express')
const AdminController = require('../controllers/AdminController')
const { body } = require('express-validator')

const router = new Router()

router.get('/products-management/:text', body('text').isString(), AdminController.getProducts)
router.post(
  '/products-management/add-shoe',
  // body('productName', "Product name can't be empty").notEmpty().isString().isLength({ max: 30 }),
  // body('shoeFor', "Shoe For can't be empty, use 'mens' or 'womens'").notEmpty().isString().isLength({ max: 6, min: 4 }),
  // body('shoePrice', "Shoe Price can't be empty and this is a number").notEmpty().isNumeric(),
  // body('shoeDiscountPrice', "Shoe Discount Price can't be empty and this is a number").notEmpty().isNumeric(),
  // body('shoeSale', 'Shoe Sale is boolean').notEmpty().isBoolean(),
  // body('shoeNew', 'Shoe New is boolean').notEmpty().isBoolean(),
  // body('shoeSize', "Shoe Size can't be empty and this is array of numbers").notEmpty().isNumeric().isArray(),
  // body('shoeColor', "Shoe Color can't be empty").notEmpty().isString().isLength({ max: 30 }),
  // body('shoeDescription', "Shoe Description can't be empty, min 10 and max 150 symbol")
  //   .notEmpty()
  //   .isString()
  //   .isLength({ min: 10, max: 150 }),
  // body('shoeStyleName', "Shoe Style Name can't be empty").notEmpty().isString().isLength({ max: 30 }),
  // body('shoeStyleMaterial', "Shoe Style Material can't be empty").notEmpty().isString().isLength({ max: 30 }),
  AdminController.addProduct
)
router.patch(
  '/products-management/change-product',
  body('productId').isString(),
  body('shoeSale', 'Shoe Sale is boolean').notEmpty().isBoolean(),
  body('shoeNew', 'Shoe New is boolean').notEmpty().isBoolean(),
  body('shoeSize', "Shoe Size can't be empty and this is array of numbers").notEmpty().isNumeric().isArray(),
  body('shoePrice', "Shoe Price can't be empty and this is a number").notEmpty().isNumeric(),
  body('shoeDiscountPrice', "Shoe Discount Price can't be empty and this is a number").notEmpty().isNumeric(),
  AdminController.changeProduct
)
router.post('/products-management/delete-product', AdminController.deleteProduct)
router.get('/users-management/:text', body('text').isString(), AdminController.getUsers)

module.exports = router
