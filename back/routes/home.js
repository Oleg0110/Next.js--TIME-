const { Router } = require('express');
const HomeController = require('../controllers/HomeController');

const router = new Router();

router.get('/', HomeController.getShoeSale);

module.exports = router;
