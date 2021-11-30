const express = require('express');
const router  = express.Router();

//POST Register if the user is new
const bcrypt = require('bcryptjs');
const addUser = require("../db/queries/addUser");
const { getUserByEmail } = require("../db/queries/getUsers");

// GET redirect user to /register.ejs
router.get("/", (req, res)=> {
  res.render("../views/register", { error: null });
});

//POST register/save new user to users table and redirect to /login
router.post("/", (req, res) => {
  const { name, email_address, phone_number, password } = req.body;

  // check if inputs are blank and return error message
  if (email_address === "" || password === "" || name === "" || phone_number === "") {
    res.status(400);
    res.render("register", { error: "Values cannot be empty! Please try again" });
    return;
  }

  // create new user object from form submit

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = {
    name: name,
    email_address: email_address,
    password: hashedPassword,
    phone_number: phone_number,
  };

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
