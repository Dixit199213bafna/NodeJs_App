import express from 'express';
import path from 'path';
import adminRouter from './admin.js';

const __dirname = path.resolve();
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(adminRouter.products);
    res.render('shop', {
        prods: adminRouter.products,
        title: 'Doc Shop',
        path: '/',
        activeShop: true,
        productCSS: true,
        hasProducts: adminRouter.products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
    });
   // res.sendFile(path.join(__dirname, 'views', 'shop.html'))
});

export default router;

