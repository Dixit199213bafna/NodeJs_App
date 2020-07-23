import express from 'express';
import path from 'path';

import adminController from '../controllers/admin.js'
const router = express.Router();
const __dirname = path.resolve();

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/admin-products', adminController.getProducts)

export default {
    router,
};