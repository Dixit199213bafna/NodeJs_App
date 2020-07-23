import express from 'express';
import path from 'path';
import productController from '../controllers/products.js';

const __dirname = path.resolve();
const router = express.Router();

router.get('/', productController.getProducts);

export default router;

