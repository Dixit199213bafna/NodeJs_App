import mongoose from 'mongoose';

const Scheme = mongoose.Schema;

const userScheme = new Scheme({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        items: [ {
            productId: {
                type: Scheme.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
            }
        }]
    }
});

userScheme.methods.addToCart = function(product) {
    let newQuantity = 1;
    const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() == product._id.toString());
    const updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0) {
        newQuantity += this.cart.items[cartProductIndex].quantity;
        updatedCartItems[cartProductIndex].quantity = newQuantity; 
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity 
        })
    }
    const updatedCart = {
        items: updatedCartItems,
    }
    this.cart = updatedCart;
    return this.save();
}

userScheme.methods.removeFromCart = function(prodId) {
    const updatedCardItem = [...this.cart.items.filter(item => item.productId.toString() !== prodId.toString())];
    this.cart.items = updatedCardItem;
    return this.save();
}

const User = mongoose.model('User', userScheme);

export default User;