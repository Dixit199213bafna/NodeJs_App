import express from 'express';
import path from 'path';

import adminController from '../controllers/admin.js'
import isAuth from '../views/middleware/is-auth.js';
const router = express.Router();
const __dirname = path.resolve();

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:id', isAuth, adminController.getEditProduct);

router.post('/edit-product/:id', isAuth, adminController.putEditProduct);

router.get('/admin-products', isAuth, adminController.getProducts);

router.post('/delete-product/:id', isAuth, adminController.deleteProduct);

export default {
    router,
};