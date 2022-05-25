import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = new Router();

router.get('/', (req, res) => {
  res.json('user');
});

router.post('/', UserController.create);

export default router;
