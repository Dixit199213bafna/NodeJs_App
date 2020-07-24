import mysql from 'mysql2';

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'testtest'
}).promise();

export default {
    pool
};