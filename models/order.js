import mongoose from 'mongoose';

const Scheme = mongoose.Schema;

const orderScheme = new Scheme({
    products: [
        {
            product: {
                type: Object,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
    user: {
        email: {
            type: String,
            required: true,
        },
        userId: {
            type: Scheme.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
});

const Order = mongoose.model('Order', orderScheme);

export default Order;