import Sequelize from 'sequelize';
import seq from '../util/database.js';

const OrderItem = seq.sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
});

export default OrderItem;