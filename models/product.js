import mongoose from 'mongoose';

const Scheme = mongoose.Schema;

const productScheme = new Scheme({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    imageUrl: String,
    userId: {
        type: Scheme.Types.ObjectId,
        ref: 'User', // Relation is setup
        required: true,
    }
});

const Product = mongoose.model('Product', productScheme);

export default Product;