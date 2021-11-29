const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const addUser = require("../db/queries/addUser");
// const {getEmailFromId, finduserbyEmail, verifyHash, generateRandomString} = require('./queries/userHelper');

// GET redirect user to /register.ejs
router.get("/", (req, res)=> {
  res.render("../views/register", { error: null });
});

//POST register/save new user to users table and redirect to /login
router.post("/", (req, res) => {
  const user = {};
  user.name = req.body.name;
  user.email_address = req.body.email_address;
  user.password = req.body.password;
  user.phone_number = req.body.phone_number;

  // const user = finduserbyEmail(user, email);
  // const hashedPassword = bcrypt.hashSync(password, 10);

  // if (email === "" || password === "") {
  //   res.redirect("Incorrect email or password");
  // }

  // if (!user) {
  //   const userId = generateRandomString();
  //   user[userId] = { id: userId, email, password: hashedPassword };
  //   req.session.id = userId;
  // } else {
  //   res.redirect("_404error");
  // }

  // console.log(user)
  addUser(user);
  // console.log("user added", user);
  res.json(user);
  // res.render("../views/login", { error: null });
});

module.exports = router;
