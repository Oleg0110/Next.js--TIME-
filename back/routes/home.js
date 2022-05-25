import { Router } from 'express';
import HomeController from '../controllers/HomeController.js';
import Shoe from '../models/shoe.js';

const router = new Router();

router.get('/', HomeController.getShoeSale);

export default router;
