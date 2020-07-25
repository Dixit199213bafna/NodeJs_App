import MongoDB from '../util/database.js';
import mongoDb from 'mongodb';

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = MongoDB.getDb();
        return db.collection('users').insertOne(this);
    }

    addOrder() {
        const db = MongoDB.getDb();
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: new mongoDb.ObjectId(this._id),
                    name: this.name
                } 
            }
            return db.collection('orders').insertOne(order)
        }).then(result => {
            this.cart = {
                items: []
            }
            return db.collection('users').updateOne({
                _id: new mongoDb.ObjectId(this._id)
            }, {
                $set : {
                    cart: {
                    items: []
                }
            }
            })
        })
    }

    addToCart(product) {
        let newQuantity = 1;
        const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() == product._id.toString());
        const updatedCartItems = [...this.cart.items];
        if(cartProductIndex >= 0) {
            newQuantity += this.cart.items[cartProductIndex].quantity;
            updatedCartItems[cartProductIndex].quantity = newQuantity; 
        } else {
            updatedCartItems.push({
                productId: new mongoDb.ObjectId(product._id),
                quantity: newQuantity 
            })
        }
        const updatedCart = {
            items: updatedCartItems,
        }
        const db = MongoDB.getDb();
        console.log(this);
        return db.collection('users').updateOne({
            _id: new mongoDb.ObjectId(this._id)
        }, {
            $set: {
                cart: updatedCart
            }
        })
    }

    getCart() {
        const db = MongoDB.getDb();
        console.log(this.cart.items)
        const productIds = this.cart.items.map(product => product.productId)
        return db.collection('products').find({
            _id: {
                $in: [...productIds]
            }
        }).toArray().then(products => {
            return products.map(p => {
                return {
                    ...p,
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString()
                    }).quantity
                }
            })
        }).catch(e => {
            console.log(e);
        })
    }

    deleteCartItem(prodId) {
        console.log(prodId);
        const db = MongoDB.getDb();
        const updatedCardItem = [...this.cart.items.filter(item => item.productId.toString() !== prodId.toString())];
        const updatedCart = {
            items: updatedCardItem,
        }
        return db.collection('users').updateOne({
            _id: new mongoDb.ObjectId(this._id)
        }, {
            $set: {
                cart: updatedCart
            }
        })
    }

    getOrders() {
        const db = MongoDB.getDb();
        return db.collection('orders').find({
            'user._id': new mongoDb.ObjectId(this._id)
        }).toArray();
    }

    static findByUserId(id) {
        const db = MongoDB.getDb();
        return db.collection('users').find({
            _id: new mongoDb.ObjectId(id)
        }).next();
    }
}
export default User;