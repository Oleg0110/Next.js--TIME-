const { Router } = require('express')
const HomeController = require('../controllers/HomeController')

const router = new Router()

router.get('/', HomeController.getProductSale)

module.exports = router
