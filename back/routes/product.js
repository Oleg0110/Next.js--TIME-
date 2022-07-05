const { Router } = require('express')
const ProductController = require('../controllers/ProductController')
const Product = require('../models/Product')

const router = new Router()

router.get('/product/:productId', ProductController.getProduct)
router.get('/:category', ProductController.getProducts)
// router.get('/:page/:sort', ProductController.sortProducts);
router.get('/:category/:filter', ProductController.filterProducts)

router.post('/', async (req, res) => {
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
  const product = new Product({
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
  res.json('product')
})

module.exports = router
