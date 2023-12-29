import { MongoClient } from "mongodb";

const dbUrl = process.env.DATABASEURL || "mongodb://localhost:27017";
const mongoClient = new MongoClient(dbUrl);
const dbName = process.env.DBNAME || "AuthDb";

const db = mongoClient.db(dbName);
// console.log("028 databaseconnection.js db.getMongo():", .getMongo());

// const dataBase = async function dbMain() {
//     await mongoClient.connect();
//     console.log("bship 028 mongodb Success Connect to DB server");
//     
//     const collection = db.collection('documents');

//     return "mongodb server done";
// }

export default {
    users: db.collection("users"),
    mongoClient
}