import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    return MongoClient.connect('mongodb+srv://bafna:testtest@cluster0.upt3y.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('connected');
        _db = client.db();
        callback(); // result is client object that gives access to DB; 
    }).catch(e => {
        throw e;
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database found';
}

export default {
    mongoConnect,
    getDb
}