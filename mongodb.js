import {MongoClient} from 'mongodb';

let dbConn;

export const connectToDB = (dbURI, cb) => {
    MongoClient.connect(dbURI)
    .then((result) => {
        dbConn = result.db();
        return cb();
    })
    .catch((err) => {
        console.log(err);
        return cb(err);
    });
}

export const getDB = () => {
    return dbConn;
}