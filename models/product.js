import { writeFileSync, readFile, writeFile } from 'fs'; 
import path from 'path';

const __dirname = path.resolve();

const p = path.join(__dirname, 'data', 'products.json');
const getProductsFromFile = (cb) => {
    readFile(p, (err, fileContent) => {
        if(err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    })
}

class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}

export default Product;