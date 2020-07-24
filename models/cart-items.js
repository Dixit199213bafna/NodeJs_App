import Sequelize from 'sequelize';
import seq from '../util/database.js';

const CartItem = seq.sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
});

export default CartItem;