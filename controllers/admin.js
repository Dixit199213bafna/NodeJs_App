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
    const product = new Product(null,title, description, imageUrl, +price);
    product.save();
    res.redirect('/');
}

const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const id = req.params.id;
    console.log(id);
    if(!editMode) {
        res.redirect('/');
    }
    Product.findById(id, product => {
        console.log(product);
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
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            title: 'Admin Products',
            path: '/admin/admin-products',
            activeShop: true,
            productCSS: true,
            hasProducts: products.length > 0 // Needed for Hbs as it cannot write logic in template or expression in template
        });
    });
   // res.sendFile(path.join(__dirname, 'views', 'shop.html'))
}

const putEditProduct = (req, res, next) => {
    const prodId = req.params.id;
    const { title, description, price, imageUrl} = req.body;
    const updateProduct = new Product(prodId, title, description, imageUrl, price);
    updateProduct.save();
    res.redirect('/admin/admin-products');
}

const deleteProduct = (req, res, next) => {
    const prodId = req.params.id;
    Product.deleteProduct(prodId, err => {
        if(!err) {
            res.redirect('/admin/admin-products');
        }
    })
}

export default {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    putEditProduct,
    deleteProduct
}