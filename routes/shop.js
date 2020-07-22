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
        path: '/'
    });
   // res.sendFile(path.join(__dirname, 'views', 'shop.html'))
});

export default router;

