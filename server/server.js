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

import dotenv from "dotenv/config";

const SECRET = process.env.SESSION_SECRET;


import session from 'express-session'
import MongoStore from 'connect-mongo'

app.use(session({
  secret: SECRET,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017",
      dbName: 'AuthDb'
    }),
    cookie: {
      sameSite: "none",
      secure: false
    },
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.authenticate('session'));

import authenticationRouter from "./lib/authenticationRouter.js";
app.use("/", authenticationRouter);

import bcrypt from "bcrypt";

const port = process.env.PORT || 8080;

// import authRouter from "authRouter.js"

app.get("/welcome", (req, res) => {
  console.log("028 server says GET WELCOME");
  if (req.session.user)   res.send({data: "welcome, 028 appget welcome user"}); //send det via sockets til frontendne og lad den håndtere resten. gamelogik, sudo ne?
  else res.send({data: "you're not welcome, 028 appget welcome no user"})
})

import db from "./database/databaseConnection.js"
app.get("/user", async (req, res) => { //test func, delete?
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

