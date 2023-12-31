// you need all that express setDefaultHighWaterMark
// and then when th euser first comes in, if they havent been here before ask them to login or register 
// then when they register you tie that name to their session and send it to the db? 

// a basisc epxress thing ey
//1112 2023 basic express
import passport from "passport";
import express from 'express';
const app = express();
import cors from 'cors';
// const corsInit = { origin: "http://localhost:8080" };
const corsInit = { 
    origin: true,
    credentials: true };
app.use(cors(corsInit));

import session from 'express-session'
import MongoStore from 'connect-mongo'
import db from "./database/databaseConnection.js"
app.use(session({
  secret: "mysecret",
    store: MongoStore.create({
    //   client: mongoClient,
    mongoUrl: "mongodb://localhost:27017",
      dbName: 'AuthDb'
    })
  }));
app.use(passport.authenticate('session'));
import authenticationRouter from "./lib/authenticationRouter.js";
app.use("/auth", authenticationRouter);

import bcrypt from "bcrypt";

import dotenv from "dotenv/config"; //use for session?
const port = process.env.PORT || 8080;

// import authRouter from "authRouter.js"

app.get("/welcome", (req, res) => {
  console.log("028 server says GET WELCOME");
  res.send({data: "welcome"});
})

app.get("/user", async (req, res) => {
  const data = await db.users.find().toArray();
  console.log("028 server get users db:", data)
})

app.get("/login", (req, res) => { 
  res.send({data: "hello?? from server get login"})
});


// app.post("/newuserregistration", express.json(), async (req, res) => {
//     usersDb(req.body.name, req.body.email, req.body.passwordHash);
//     res.send("028 bship server newuserregistration hit!");
// });


app.listen(port, () => {console.log("server listen bship28 on port:", port)})

