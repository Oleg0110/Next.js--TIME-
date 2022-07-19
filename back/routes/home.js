const { Router } = require('express')
const HomeController = require('../controllers/HomeController')

const router = new Router()

router.get('/', HomeController.getProductSale)
router.get('/get-unconfirmed-orders', HomeController.getUnconfirmedOrders)

module.exports = router
