import express from 'express';
import path from 'path';

import productController from '../controllers/products.js'
const router = express.Router();
const __dirname = path.resolve();

router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.postAddProduct);

export default {
    router,
};