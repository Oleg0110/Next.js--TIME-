const { Router } = require('express')
const ProductController = require('../controllers/ProductController')
const Product = require('../models/Product')

const router = new Router()

router.get('/product/:productId', ProductController.getProduct)
router.get('/product/photos/:productId', ProductController.getProductPhotos)
router.get('/:category/:page', ProductController.getProducts)
router.get('/:category', ProductController.filterProducts)
router.post('/add-review', ProductController.addReview)
router.get('/:category/get-review/:productId', ProductController.getReview)
router.get('/:category/get-recommended/:style', ProductController.getRecommended)

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
