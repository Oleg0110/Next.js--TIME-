const { Router } = require('express')
const HomeController = require('../controllers/HomeController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

// Get
router.get('/', HomeController.getProductSale)
router.get('/get-unconfirmed-orders', HomeController.getUnconfirmedOrders)
router.get('/get-favorite/:userId', authMiddleware, HomeController.getFavorite)
router.get('/product-search/:searchValue', HomeController.globalProductSearch)

module.exports = router
