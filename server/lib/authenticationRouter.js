import { Router, json } from "express";
import { passwordStrength } from "check-password-strength";
import bcrypt from "bcrypt";
import passport from "passport";
import JsonStrategy from "passport-json";

import db from "../database/databaseConnection.js";
import addUser from "../database/create.js";
// import readUserNameAndPasswordForAuthentication from "../database/read.js";

const router = Router();

router.use(json());
let user;

passport.use(new JsonStrategy(
  async function(username, password, done) {
    // console.log("028 server auth 1");
   try {
      user = await db.users.findOne({ name: username });
      //  console.log("028 server auth 1.1 user found:", user);
      if (!user)  return done(null, false); 
      const isPasswordReal = await bcrypt.compare(password, user.hashedPassword)
      if (!isPasswordReal) return done(null, false)
    }
    catch (err) {
          // console.log("028 auth error!");
      return done(err)
    }
  return done(null, user)
  }
));

/*
passport.use(new LocalStrategy(function verify(username, password, cb) {
  console.log("auth 028 -1 cryp")
  dbRead.collection('users').findOne({name: "hans", password: "nyre1!" }, function(err, row) {
      if (err) { 
        console.log("auth 028 1 crype:  in pw:", err)
        return cb(err); 
      }
      if (!row) { 
        console.log("auth 028 2  crype: error in pw:", err)
        return cb(null, false, { message: 'Incorrect username or password.' }); }
      

      //old crypt
      /*
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, row);
      });
    });
    */
   /*
   bcrypt.compare(password, row.hashedPassword, function(err, hashedPassword) {
     if (err) { 
       console.log("auth 028 3 crype: error in pw:", err)
       return cb(err); 
      }
      if (!crypto.compare(row.hashedPassword, hashedPassword)) {
        
        console.log("auth 028 4 crype: wrong compare:", err)
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      console.log("auth 028 5 cryp  it works:, row:", row)
     return cb(null, row);
   });
 });
}));
*/

//old auth i made
router.post("/register", json(), async (req, res) => { 
    if ((passwordStrength(req.body.password).id) == 0 ) {
        res.status(403);
        res.send({data: "Error: password too weak."});
     }; 
    const hashedPw = await bcrypt.hash(req.body.password, 12);
    const newUser = {
        name: req.body.username,
        email: req.body.email,
        passwordHash: hashedPw
    };
    const postFetchInit =  {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(newUser)
    }
    console.log("bship server lib authrouter SyntaxError? 001 name:", newUser);
    console.log("bship server lib authrouter SyntaxError? 002 passwqore:", newUser.passwordHash);
    fetch("http://localhost:8080/newuserregistration", postFetchInit);
}) 
router.post("/newuserregistration", json(), async (req, res) => {
  addUser(req.body.name, req.body.email, req.body.passwordHash);
  res.send("028 bship server newuserregistration hit!");
});

router.post('/login/password', 
  passport.authenticate('json', { failureRedirect: '/login' }),
  function(req, res) { 
    // console.log("028 auth router post login/password being hit");
    // req.session.numberSession = req.session.numberSession ?? 0;
    // req.session.numberSession++;
    req.session.user = user;
    res.redirect('/welcome');
  });

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
  
//old registration endpoint


export default router;