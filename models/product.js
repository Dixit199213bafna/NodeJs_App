import mongodb from 'mongodb';
import mongo from "../util/database.js";

class Product {
    constructor(title, price, description, imageUrl, id = null) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = mongo.getDb();
        let dbOp;
        if(this._id) {
            // Update exisiting Product
            console.log(this._id);
            dbOp = db.collection('products').updateOne({
                _id: this._id
            }, {
                $set: this //$set is revered keyword for mongodb
            });
        } else {
            dbOp = db.collection('products').insertOne(this); // Add new product
        }
        return dbOp;
    }

    static fetchAll() {
        const db = mongo.getDb();
        return db.collection('products').find().toArray();
    }

    static findbyId(id) {
        const db = mongo.getDb();
        return db.collection('products').find( {
           _id: new mongodb.ObjectId(id),
        }).next();
    }

    static deletebyId(id) {
        const db = mongo.getDb();
        return db.collection('products').deleteOne( {
           _id: new mongodb.ObjectId(id),
        });
    }
}

export default Product;