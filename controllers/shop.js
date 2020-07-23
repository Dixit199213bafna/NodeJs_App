import Product from '../models/product.js';
import Cart from '../models/cart.js';

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

const postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

const getProductDetail = (req, res, next) => {
    const prodId = req.params.id;
    Product.findById(prodId, product => {
        if(product) {
            res.render('shop/product-detail', {
                prod: product,
                title: 'Product Detail',
                path: '/products',
                activeShop: true,
                productCSS: true,
            });
        } else {
            res.redirect('/products');
        }
    })
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
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(let product of products) {
                const a = cart.products.find(prod => prod.id === product.id);
                if(a) {
                    cartProducts.push({
                        productData: product,
                        qty: a.qty,
                    });
                }
            }
            res.render('shop/cart', {
                prods: cartProducts,
                totalPrice: cart.totalPrice,
                title: 'Your Cart',
                path: '/cart',
                activeShop: true,
                productCSS: true
            });
        })
    })
}

const getCheckOut = (req, res, next) => {
    res.render('shop/checkout', {
        title: 'Your Cart',
        path: '/checkout',
        activeShop: true,
        productCSS: true
    });
}

const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        title: 'Your Orders',
        path: '/orders',
        activeShop: true,
        productCSS: true
    });
}

const deleteCartItem = (req, res, next) => {
    Product.findById(req.body.productId, product => {
        Cart.deleteProduct(req.body.productId, product.price);
        res.redirect('/cart');
    })
}

export default {
    getProducts,
    getIndex,
    getCart,
    getCheckOut,
    getOrders,
    getProductDetail,
    postCart,
    deleteCartItem
}