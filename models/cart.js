import path from 'path';
import { readFile, writeFile } from 'fs';

const __dirname = path.resolve();

const p = path.join(__dirname, 'data', 'cart.json');

class Cart {
   static addProduct(id, productPrice) {
        readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0,
            }
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            const exisitingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const exisitingProduct = cart.products[exisitingProductIndex];
            let updatedProduct;
            if(exisitingProduct) {
                updatedProduct = {
                    ...exisitingProduct,
                    qty: exisitingProduct.qty+1,
                }
                cart.products = [
                    ...cart.products,
                ]
                cart.products[exisitingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id: id,
                    qty: 1
                }
                cart.products = [
                    ...cart.products,
                    updatedProduct
                ]
            }
            cart.totalPrice += productPrice;
            writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        });
   }
}

export default Cart;