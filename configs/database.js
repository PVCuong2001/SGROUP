const { MongoClient } = require('mongodb');

let databaseConnection;

const createDatabase = async () => {
    if (!databaseConnection) {
        databaseConnection = await connectDB();
    }
    const db = databaseConnection.db('sgroup');
    db.createCollection("users").catch((err) => {
        console.log(err.message);
    });
};

const connectDB = () => {
    const url = process.env.DB_URI || 'mongodb://127.0.0.1:27017';
    return new Promise((resolve, reject) => {
        MongoClient.connect(url)
            .then(client => resolve(client))
            .catch(err => reject(err));
    });
}

const getDatabaseConnection = () => databaseConnection;

module.exports = {
    createDatabase,
    getDatabaseConnection,
}