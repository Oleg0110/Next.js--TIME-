const { Router } = require('express')
const { body } = require('express-validator')
const UserController = require('../controllers/UserController')

const router = new Router()

// Get
router.get('/activate/:link', UserController.activate)
router.get('/refreshToken', UserController.refreshToken)
router.get('/get-orders/:userId', UserController.getOrders)
router.get('/check-password/:userId/:password', UserController.checkPassword)
router.get('/send-confirm-code/:userId/:code', UserController.sendConfirmCode)

// Post
router.post(
  '/registration',
  body('name', "Name user can't be empty").notEmpty(),
  body('surname', "Surname user can't be empty").notEmpty(),
  body('email').isEmail().notEmpty(),
  body('password', 'Password must be min: 8 symbol')
    .isLength({
      min: 8,
      max: 100,
    })
    .notEmpty(),
  UserController.registration
)
router.post(
  '/login',
  body('email').isEmail().notEmpty(),
  body('password', 'Password must be min: 8 symbol')
    .isLength({
      min: 8,
      max: 100,
    })
    .notEmpty(),
  UserController.login
)
router.post('/logout', UserController.logout)
router.post('/delivery-details/create-order', UserController.createOrder)

// Patch
router.patch('/change-user-data', UserController.changeUserData)
router.patch('/add-user-phone', UserController.addUserPhone)

// Delete
router.delete('/delete-user/:userId', UserController.deleteUser)

module.exports = router
