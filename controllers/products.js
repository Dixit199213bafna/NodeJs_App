import Product from '../models/product.js';

const products = [];

const getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(__dirname, 'views', 'add-product.html'));
    res.render('add-product', {
        title: 'Add Products',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    })
}

const postAddProduct = (req,res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        console.log(products);
        res.render('shop', {
            prods: products,
            title: 'Doc Shop',
            path: '/',
            activeShop: true,
            productCSS: true,
            hasProducts: products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
        });
    });
   // res.sendFile(path.join(__dirname, 'views', 'shop.html'))
}

export default {
    getAddProduct,
    postAddProduct,
    getProducts
}