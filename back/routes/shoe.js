import { Router } from 'express';
import ShoeController from '../controllers/ShoeController.js';
import Shoe from '../models/shoe.js';

const router = new Router();

router.get('/:page', ShoeController.getShoes);
// router.get('/:page/:sort', ShoeController.sortShoe);
router.get('/:page/:filter', ShoeController.filterShoes);

router.post('/', async (req, res) => {
  const {
    productName,
    shoeFor,
    shoeNew,
    shoePrice,
    shoeDiscountPrice,
    shoeSale,
    shoeSize,
    shoeColor,
    shoeDescription,
    shoeStyleName,
    shoeStyleMaterial,
  } = req.body;
  const shoe = new Shoe({
    productName,
    shoeFor,
    shoeNew,
    shoePrice,
    shoeDiscountPrice,
    shoeSale,
    shoeSize,
    shoeColor,
    shoeDescription,
    shoeStyleName,
    shoeStyleMaterial,
  });

  await shoe.save();
  res.json('shoe');
});

export default router;
