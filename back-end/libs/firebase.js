require("dotenv").config();
const firebase = require("firebase");
require("firebase/firestore");

// TODO add firebase config here
var firebaseConfig = {
  apiKey: process.env.fbApiKey,
  authDomain: "testproj1-f59ed.firebaseapp.com",
  databaseURL: "https://testproj1-f59ed.firebaseio.com",
  projectId: "testproj1-f59ed",
  storageBucket: "",
  messagingSenderId: "96239760474",
  appId: "1:96239760474:web:5d30b4629a336bd9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// call firebase.initializeApp and pass in your config object

module.exports = {
  db: firebase.firestore()
};
