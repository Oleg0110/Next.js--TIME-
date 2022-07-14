const { Router } = require('express')
const CommonController = require('../controllers/CommonController')

const router = new Router()

router.get('/', CommonController.getProductSale)
// router.post('/delivery-details/create-order', CommonController.createOrder)

module.exports = router
