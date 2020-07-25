import Product from '../models/product.js';

const getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(__dirname, 'views', 'add-product.html'));
    res.render('admin/edit-product', {
        prod: new Product(null, '', '', '', 0),
        title: 'Add Products',
        path: '/admin/add-product',
        editing: false,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    })
}

const postAddProduct = (req,res) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(title, +price, description, imageUrl);
    product.save().then(result => {
        res.redirect('/admin/admin-products');
    }).catch(e => e);
}

const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const id = req.params.id;
    if(!editMode) {
        res.redirect('/');
    }
    Product.findbyId(id).then(product => {
        res.render('admin/edit-product', {
            prod: product,
            title: 'Edit Products',
            path: '/admin/edit-product',
            editing: editMode,
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
        })
    });
    //res.sendFile(path.join(__dirname, 'views', 'add-product.html'));
    
}

const getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('admin/products', {
            prods: products,
            title: 'Admin Products',
            path: '/admin/admin-products',
            activeShop: true,
            productCSS: true,
            hasProducts: products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
        });
    }).catch(e => {
        console.log(e);
    });
}

const putEditProduct = (req, res, next) => {
    const prodId = req.params.id;
    const { title, description, price, imageUrl} = req.body;
    const product = new Product(title, +price, description, imageUrl, prodId);
    product.save().then(() => {
        res.redirect('/admin/admin-products');
    }).catch(e => {
        console.log(e);
    });
}

const deleteProduct = (req, res, next) => {
    const prodId = req.params.id;
    Product.deletebyId(prodId)
    .then(() => {
        res.redirect('/admin/admin-products');
    }).catch(e => {
        console.log(e);
    });
}

export default {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    putEditProduct,
    deleteProduct
}