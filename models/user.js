import Sequelize from 'sequelize';
import seq from '../util/database.js';

const User = seq.sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
});

export default User;