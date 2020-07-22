import express from 'express';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();
const products = [];
router.get('/add-product', (req, res, next) => {
    //res.sendFile(path.join(__dirname, 'views', 'add-product.html'));
    res.render('add-product', {
        title: 'Add Products',
    })
});

router.post('/add-product', (req,res) => {
    products.push({
        title: req.body.title
    });
    res.redirect('/');
});

export default {
    router,
    products,
};