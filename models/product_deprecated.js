// import { readFile, writeFile } from 'fs'; 
// import path from 'path';
import db from '../util/database.js';
import Cart from './cart.js';
// const __dirname = path.resolve();

// const p = path.join(__dirname, 'data', 'products.json');
// const getProductsFromFile = (cb) => {
//     readFile(p, (err, fileContent) => {
//         if(err) {
//             return cb([]);
//         }
//         cb(JSON.parse(fileContent));
//     })
// }

class Product {
    constructor(id, title, description, imageUrl, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    save() {
        return db.pool.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)', 
        [this.title, this.price, this.imageUrl, this.description])
        /* getProductsFromFile(products => {
            if(this.id) {
                const updatedProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[updatedProductIndex] = this;
                writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        }) */
    }

    static fetchAll(cb) {
        return db.pool.execute('SELECT * FROM products');
        // getProductsFromFile(cb);
    }

    static findById(id, cb) {
        return db.pool.execute('SELECT * FROM products where products.id = ?', [id]);
        /* getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            cb(product);
        }) */
    }

    static deleteProduct(id, cb) {
        /* getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const productIndex = products.findIndex(prod => prod.id === id);
            const updatedProducts = [...products];
            updatedProducts.splice(productIndex, 1);
            writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if(!err) {
                    Cart.deleteProduct(id, product.price);
                }
                cb(err);
            });
        })*/
    }
}

export default Product;