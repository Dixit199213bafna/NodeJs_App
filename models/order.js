import Sequelize from 'sequelize';
import seq from '../util/database.js';

const Order = seq.sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
});

export default Order;