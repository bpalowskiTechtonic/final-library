const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const { createJWToken, verifyJWTToken } = require("../libs/auth");
const { db } = require("../libs/firebase");

router.post("/register", async function(req, res) {
  const { firstName = "", lastName = "", email, password } = req.body;
  console.log(firstName, lastName, email, password);
  if (!email || !password) {
    return res.status(400).json({
      msg: "There was a problem registering the user."
    });
  }
  const hashedPassword = bcryptjs.hashSync(password, 8);
  let newDoc = db.collection("users").doc();
  let user = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    id: newDoc.id
  };
  await newDoc.set(user).catch(err => {
    console.log(err);
  });
  return res.status(200).send({
    auth: true,
    message: "registration successful",
    token: createJWToken({ sessionData: user, maxAge: 3600 })
  });
});

router.post("/login", function(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      msg: "You need a email and password to log in"
    });
  }
  let docRef = db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        return res.status(400).json({
          msg: "User does not exist"
        });
      } else {
        let arr = [];
        querySnapshot.docs.map(documentSnapshot => {
          return arr.push(documentSnapshot.data());
        });
        let boolAuth = bcryptjs.compareSync(password, arr[0].password);
        const { firstName, lastName, id, email } = arr[0];
        let user = {
          id,
          firstName,
          lastName,
          email
        };
        if (!boolAuth) {
          return res.status(400).json({
            auth: false,
            token: null,
            message: "invalid credentials"
          });
        } else {
          return res.status(200).send({
            auth: true,
            token: createJWToken({ sessionData: user, maxAge: 3600 }),
            email: user.email
          });
        }
      }
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
});

router.get("/logout", function(req, res) {
  return res.status(200).json({
    msg: "You are logged Out",
    auth: false,
    token: null
  });
});
module.exports = router;
