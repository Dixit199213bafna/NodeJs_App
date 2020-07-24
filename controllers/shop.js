import Product from '../models/product.js';
import Cart from '../models/cart.js';
import Order from '../models/order.js';

const getProducts = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('shop/product-list', {
            prods: products,
            title: 'All Products',
            path: '/products',
            activeShop: true,
            productCSS: true,
            hasProducts: products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
        });
    }).catch(e => {
        console.log(e);
    });
}

const postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let newQuantity = 1;
    let fetchedCart;
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts({
            where: {
               id:  prodId
            }
        })
    }).then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }
        if(product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity += oldQuantity;
            return product;
        } 
        return Product.findByPk(prodId);
    }).then(product => {
        return fetchedCart.addProduct(product, {
            through: {
                quantity: newQuantity,
            }
        })
    }).then(() => {
        res.redirect('/cart');
    }).catch(e => {
        console.log(e);
    });
}

const getProductDetail = (req, res, next) => {
    const prodId = req.params.id;
    Product.findOne({
        where: {
            id: +prodId
        }
    }).then((product) => {
        if(product) {
            res.render('shop/product-detail', {
                prod: product,
                title: product.title,
                path: '/products',
                activeShop: true,
                productCSS: true,
            });
        } else {
            res.redirect('/products');
        }
    }).catch(e => {
        console.log(e);
    });
}

const getIndex = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('shop/product-list', {
            prods: products,
            title: 'Shop',
            path: '/',
            activeShop: true,
            productCSS: true,
            hasProducts: products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
        });
    }).catch(e => {
        console.log(e);
    });
}

const getCart = (req, res, next) => {
    req.user.getCart().then(cart => {
        return cart.getProducts();
    }).then(products => {
        console.log(products);
        res.render('shop/cart', {
            prods: products,
            // totalPrice: cart.totalPrice,
            title: 'Your Cart',
            path: '/cart',
            activeShop: true,
            productCSS: true
        });
    }).catch(e => {
        console.log(e)
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
    req.user.getOrders({ include: ['products']}).then(orders => {
        console.log(orders);
        res.render('shop/orders', {
            title: 'Your Orders',
            path: '/orders',
            activeShop: true,
            productCSS: true,
            orders: orders
        });
    }).catch(e => {
        console.log(e);
    })
}

const deleteCartItem = (req, res, next) => {
    req.user.getCart().then(cart => {
        return cart.getProducts({
            where: {
                id: req.body.productId
            }
        })
    }).then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    }).then(() => {
        res.redirect('/cart');
    }).catch(e => {
        console.log(e);
    });
}

const postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    }).then(products => {
        return req.user.createOrder().then(order => {
            order.addProducts(products.map(prod => {
                prod.orderItem = {
                    quantity: prod.cartItem.quantity
                }
                return prod;
            }))
        });
    }).then(result => {
        return fetchedCart.setProducts(null);
    }).then(() => {
        res.redirect('/orders');
    });
}

export default {
    getProducts,
    getIndex,
    getCart,
    getCheckOut,
    getOrders,
    getProductDetail,
    postCart,
    deleteCartItem,
    postOrder
}