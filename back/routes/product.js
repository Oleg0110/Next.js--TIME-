const { Router } = require('express')
const ProductController = require('../controllers/ProductController')

const router = new Router()

router.get('/product/:productId', ProductController.getProduct)
router.get('/product/photos/:productId', ProductController.getProductPhotos)
router.get('/:category/:page', ProductController.getProducts)
router.get('/:category', ProductController.filterProducts)
router.post('/add-review', ProductController.addReview)
router.get('/:category/get-review/:productId', ProductController.getReview)
router.get('/:category/get-recommended/:style', ProductController.getRecommended)
router.post('/add-to-favorite', ProductController.addProductToFavorite)
router.delete('/remove-from-favorite/:favoriteId/:userId', ProductController.removeProductToFavorite)

module.exports = router
