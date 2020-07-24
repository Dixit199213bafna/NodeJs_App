import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'node-complete',
    'root',
    'testtest',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

export default {
    sequelize,
}

/* import mysql from 'mysql2';

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'testtest'
}).promise();

export default {
    pool
}; */