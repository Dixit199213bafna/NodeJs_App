import Product from '../models/product.js';

const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        console.log(products);
        res.render('shop/product-list', {
            prods: products,
            title: 'All Products',
            path: '/products',
            activeShop: true,
            productCSS: true,
            hasProducts: products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
        });
    });
   // res.sendFile(path.join(__dirname, 'views', 'shop.html'))
}

const getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        console.log(products);
        res.render('shop/index', {
            prods: products,
            title: 'Shop',
            path: '/',
            activeShop: true,
            productCSS: true,
            hasProducts: products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
        });
    });
}

const getCart = (req, res, next) => {
    res.render('shop/cart', {
        title: 'Your Cart',
        path: '/cart',
        activeShop: true,
        productCSS: true
    });
}

const getCheckOut = (req, res, next) => {
    res.render('shop/checkout', {
        title: 'Your Cart',
        path: '/checkout',
        activeShop: true,
        productCSS: true
    });
}


export default {
    getProducts,
    getIndex,
    getCart,
    getCheckOut
}