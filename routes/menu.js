const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const addUser = require("../db/queries/addUser");
const { getUserByEmail } = require("../db/queries/getUsers");

// GET redirect user to /register.ejs
router.get("/menu", (req, res)=> {
  res.render("../views/menu", { error: null });
});

//POST register/save new user to users table and redirect to /login
router.post("/", (req, res) => {
  const { name, email_address, phone_number, password } = req.body;

  // check if inputs are blank and return error message
  if (email_address === "" || password === "" || name === "" || phone_number === "") {
    res.status(400);
    res.render("menu", { error: "Values cannot be empty! Please try again" });
    return;
  }

  // create new user object from form submit
  const newUser = {};
  newUser.name = name;
  newUser.email_address = email_address;
  newUser.password = password;
  newUser.phone_number = phone_number;

  // const hashedPassword = bcrypt.hashSync(password, 10);

  getUserByEmail(newUser.email_address)
    .then((user) => {
      // if user exists, display error message
      if (user) {
        res.status(400);
        res.render("register", { error: "Email already registered! Try restting password" });
        return;
      } else {
        // add newUser if user does not exist
        addUser(newUser);
        res.json(newUser);
        // res.render("../views/login", { error: null });
      }

    });
});

module.exports = router;
