// you need all that express setDefaultHighWaterMark
// and then when th euser first comes in, if they havent been here before ask them to login or register 
// then when they register you tie that name to their session and send it to the db? 

// a basisc epxress thing ey
//1112 2023 basic express

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
import mongoClient from "./database/databaseConnection.js"
app.use(session({
    store: MongoStore.create({
    //   client: mongoClient,
    mongoUrl: "mongodb://localhost:27017",
      dbName: 'AuthDb'
    })
  }));

import bcrypt from "bcrypt";

import dotenv from "dotenv/config"; //use for session?
const port = process.env.PORT || 8080;

// import authRouter from "authRouter.js"



app.get("/users/getsession/", (req, res) => { 
});

import authenticationRouter from "./lib/authenticationRouter.js";
app.use("/auth", authenticationRouter);

// app.post("/newuserregistration", express.json(), async (req, res) => {
//     usersDb(req.body.name, req.body.email, req.body.passwordHash);
//     res.send("028 bship server newuserregistration hit!");
// });


app.listen(port, () => {console.log("server listen bship28 on port:", port)})

// 2012 2023
// 1522
// jeg har nu sendt nye brugers password etc til databasen -- så det er registaretion., nu skal man kunne auth'e, ok?