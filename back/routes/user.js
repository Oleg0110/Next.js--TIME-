const { Router } = require('express')
const { body } = require('express-validator')
const HomeController = require('../controllers/HomeController')
const UserController = require('../controllers/UserController')

const router = new Router()

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
router.get('/activate/:link', UserController.activate)
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
router.get('/refreshToken', UserController.refreshToken)
router.post('/delivery-details/create-order', UserController.createOrder)

module.exports = router
