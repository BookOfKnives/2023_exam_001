import { Router, json } from "express";
import { passwordStrength } from "check-password-strength";
import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";

import db from "../database/read.js";
import addUser from "../database/create.js";
// import readUserNameAndPasswordForAuthentication from "../database/read.js";

const router = Router();

passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.collection('users').find({name: username }, function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      

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
   bcrypt.compare(password, row.hashedPassword, function(err, hashedPassword) {
     if (err) { return cb(err); }
     if (!crypto.compare(row.hashedPassword, hashedPassword)) {
       return cb(null, false, { message: 'Incorrect username or password.' });
     }
     return cb(null, row);
   });
 });
}));



//old auth i made
router.post("/register", json(), async (req, res) => { 
    if ((passwordStrength(req.body.password).id) == 0 ) {
        res.status(403);
        res.send({data: "Error: password too weak."});
     }; 
    const hashedPw = await bcrypt.hash(req.body.password, 12);
    const newUser = {
        name: req.body.name,
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
    // console.log("bship server lib authrouter SyntaxError? 001 name:", newUser.name);
    // console.log("bship server lib authrouter SyntaxError? 002 passwqore:", newUser.passwordHash);
    fetch("http://localhost:8080/auth/newuserregistration", postFetchInit);
}) //end of old auth

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

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
router.post("/newuserregistration", json(), async (req, res) => {
  addUser(req.body.name, req.body.email, req.body.passwordHash);
  res.send("028 bship server newuserregistration hit!");
});

export default router;