const { Router } = require('express')
const HomeController = require('../controllers/HomeController')

const router = new Router()

router.get('/', HomeController.getProductSale)
router.get('/get-unconfirmed-orders', HomeController.getUnconfirmedOrders)
router.get('/get-favorite/:userId', HomeController.getFavorite)
router.get('/product-search/:searchValue', HomeController.globalProductSearch)

module.exports = router
