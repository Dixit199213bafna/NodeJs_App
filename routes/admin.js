import express from 'express';
import path from 'path';

import adminController from '../controllers/admin.js'
const router = express.Router();
const __dirname = path.resolve();

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:id', adminController.getEditProduct);

router.post('/edit-product/:id', adminController.putEditProduct);

router.get('/admin-products', adminController.getProducts);

router.post('/delete-product/:id', adminController.deleteProduct);

export default {
    router,
};