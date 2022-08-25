const { Router } = require('express')
const { body } = require('express-validator')
const AdminController = require('../controllers/AdminController')

const router = new Router()

// Get
router.get('/:searchValue', body('searchValue').isString(), AdminController.getProducts)
router.get('/get-confirmed-orders/:searchValue', body('searchValue').isString(), AdminController.getConfirmedOrders)
router.get('/users-management/:searchValue', body('searchValue').isString(), AdminController.getUsers)
router.get('/users-management/team/get-user-in-team', AdminController.getUserInTeam)

// Post
router.post('/products-management/add-product/add-photos', body('searchValue').isString(), AdminController.addPhoto)
router.post('/products-management/add-product', AdminController.addProduct)

// Patch
router.patch('/change-order-status', body('searchValue').isString(), AdminController.changeOrderStatus)
router.patch('/products-management/change-product', AdminController.changeProduct)
router.patch('/users-management/team/user-assignment', AdminController.userAssignment)
router.patch('/users-management/team/remove-user-assignment', AdminController.removeAssignmentAdmin)

// Delete
router.delete('/products-management/delete-product/:productId/:searchValue', AdminController.deleteProduct)

module.exports = router
