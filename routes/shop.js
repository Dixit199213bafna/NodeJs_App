import express from 'express';
import path from 'path';
import shopController from '../controllers/shop.js';

const __dirname = path.resolve();
const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts)
router.get('/products/:id', shopController.getProductDetail)
router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)
router.get('/orders', shopController.getOrders);
router.post('/cart-delete-item', shopController.deleteCartItem);
router.post('/create-order', shopController.postOrder);
export default router;

