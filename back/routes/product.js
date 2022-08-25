const { Router } = require('express')
const ProductController = require('../controllers/ProductController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()
// Get
router.get('/product/:productId', ProductController.getProduct)
router.get('/product/photos/:productId', ProductController.getProductPhotos)
router.get('/:category', ProductController.getProducts)
router.get('/:category/posts', ProductController.paginationProducts)
router.get('/:category/get-review/:productId', ProductController.getReview)
router.get('/:category/get-recommended/:style', ProductController.getRecommended)

// Post
router.post('/add-review', ProductController.addReview)
router.post('/add-to-favorite', authMiddleware, ProductController.addProductToFavorite)

// Delete
router.delete('/remove-from-favorite/:favoriteId/:userId', authMiddleware, ProductController.removeProductToFavorite)

module.exports = router
