import express from 'express';
import path from 'path';
import shopController from '../controllers/shop.js';

const __dirname = path.resolve();
const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts)
router.get('/cart', shopController.getCart)
router.get('/checkout', shopController.getCheckOut)

export default router;

