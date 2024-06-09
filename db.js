// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;
const mongoose = require('mongoose');

// let database;


async function getDatabase() {
    // const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    // database = client.db('library');

    // if(!database){
    //     console.log('Database not connected');
    // }
    // return database;
    mongoose.connect('mongodb://127.0.0.1:27017/library')
    .then(()=>{
        console.log("database connected!");
    })
    .catch(()=>{
        console.log("database not connected!");
    })
}

module.exports = {
    getDatabase,
    // ObjectID
}