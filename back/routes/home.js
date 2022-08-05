const { Router } = require('express')
const HomeController = require('../controllers/HomeController')

const router = new Router()

router.get('/', HomeController.getProductSale)
router.get('/:searchValue', HomeController.globalProductSearch)
router.get('/get-unconfirmed-orders', HomeController.getUnconfirmedOrders)
router.get('/get-favorite/:userId', HomeController.getFavorite)

module.exports = router
