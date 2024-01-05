import { MongoClient } from "mongodb";

const dbUrl = process.env.DATABASEURL || "mongodb://localhost:27017";
const mongoClient = new MongoClient(dbUrl);
const dbName = process.env.DBNAME || "AuthDb";

let conn;
// const db = mongoClient.db(dbName);

try {
    conn = await mongoClient.connect();
} catch(err) {
    console.log("mongodb databaseconnection error:", err)
}

// console.log("028 databaseconnection.js db.getMongo():", .getMongo());

// const dataBase = async function dbMain() {
//     await mongoClient.connect();
//     console.log("bship 028 mongodb Success Connect to DB server");
//     
//     const collection = db.collection('documents');

//     return "mongodb server done";
// }
const db = conn.db(dbName)
export default {
    // users: conn.collection('users')
    users: db.collection("users")
}