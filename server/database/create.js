import userDb from "./databaseConnection.js";

async function addUser(name, email, hashedPassword){
    userDb.users.insertOne({ name, hashedPassword, email });
}

// console.log("createjs 028 hitting it");

export default addUser;