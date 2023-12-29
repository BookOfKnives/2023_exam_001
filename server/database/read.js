import db from "./databaseConnection.js";

// const foundShops = await db.shops.find({ city: "Hellerup" }).toArray();
async function readUserNameAndPasswordForAuthentication(username, password) {
    return await db.users.find().toArray();    
};

export default readUserNameAndPasswordForAuthentication