import Sequelize from 'sequelize';
import seq from '../util/database.js';

const Cart = seq.sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
});

export default Cart;