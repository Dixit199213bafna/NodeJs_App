import express from 'express';
import path from 'path';
import shopController from '../controllers/shop.js';
import isAuth from '../views/middleware/is-auth.js';

const __dirname = path.resolve();
const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts)
router.get('/products/:id', shopController.getProductDetail)
router.get('/cart', isAuth, shopController.getCart)
router.post('/cart', isAuth, shopController.postCart)
router.get('/orders', isAuth, shopController.getOrders);
router.post('/cart-delete-item', isAuth, shopController.deleteCartItem);
router.post('/create-order', isAuth, shopController.postOrder);
export default router;

