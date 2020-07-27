import Product from '../models/product.js';
import Order from '../models/order.js';
// import Cart from '../models/cart.js';
// import Order from '../models/order.js';

const getProducts = (req, res, next) => {
    Product.find({}).then((products) => {
        res.render('shop/product-list', {
            prods: products,
            title: 'All Products',
            path: '/products',
            activeShop: true,
            productCSS: true,
            isAuthenticated: req.session.isLoggedIn,
            hasProducts: products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
        });
    }).catch(e => {
        console.log(e);
    });
}

const postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
        return req.user.addToCart(product)
    }).then(result => {
        console.log(result)
        res.redirect('/cart');
    }).catch(e => {
        console.log(e);
    });
}

const getProductDetail = (req, res, next) => {
    const prodId = req.params.id;
    Product.findById(prodId).then(product => {
        if(product) {
            res.render('shop/product-detail', {
                prod: product,
                title: product.title,
                path: '/products',
                activeShop: true,
                productCSS: true,
                isAuthenticated: req.session.isLoggedIn,
            });
        } else {
            res.redirect('/products');
        }
    }).catch(e => {
        console.log(e);
    });
}

const getIndex = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    Product.find({}).then((products) => {
        res.render('shop/product-list', {
            prods: products,
            title: 'Shop',
            path: '/',
            activeShop: true,
            productCSS: true,
            isAuthenticated: req.session.isLoggedIn,
            hasProducts: products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
        });
    }).catch(e => {
        console.log(e);
    });
}

const getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        res.render('shop/cart', {
            prods: user.cart.items,
            // totalPrice: cart.totalPrice,
            title: 'Your Cart',
            path: '/cart',
            activeShop: true,
            productCSS: true,
            isAuthenticated: req.session.isLoggedIn,
        });
    }).catch(e => {
        console.log(e);
        redirect('/login');
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

const getOrders = (req, res, next) => {
    Order.find({
        'user.userId': req.user._id
    }).populate('products.product')
    .then(orders => {
        res.render('shop/orders', {
            title: 'Your Orders',
            path: '/orders',
            activeShop: true,
            productCSS: true,
            orders: orders,
            isAuthenticated: req.session.isLoggedIn,
        });
    }).catch(e => {
        console.log(e);
    });
}

const deleteCartItem = (req, res, next) => {
    req.user.removeFromCart(req.body.productId).then(() => {
        res.redirect('/cart');
    }).catch(e => {
        console.log(e);
    });
}

const postOrder = (req, res, next) => {
    req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map(i => {
            return {
                quantity: i.quantity,
                product: i.productId
            }
        });
        const order = new Order({
            products,
            user: {
                name: req.user.name,
                userId: req.user
            },
        });
        return order.save();
    }).then(() => {
        req.user.cart.items = [];
        return req.user.save();
    }).then(() => {
        res.redirect('/orders');
    }).catch(e => {
        console.log(e);
    });
}

export default {
    getProducts,
    getIndex,
    getCart,
    // getCheckOut,
    getOrders,
    getProductDetail,
    postCart,
    deleteCartItem,
    postOrder
}