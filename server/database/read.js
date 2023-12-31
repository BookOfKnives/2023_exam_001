import db from "./databaseConnection.js";

// const foundShops = await db.shops.find({ city: "Hellerup" }).toArray();
async function readUserNameAndPasswordForAuthentication(username, password) {
    console.log("028 server db read being hit")
    const data = await db.users.find({name: username}).toArray();    
    console.log("028 server db read data:", data)
    return data;
};

export default { 
    User: readUserNameAndPasswordForAuthentication
}