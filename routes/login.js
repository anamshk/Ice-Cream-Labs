const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const db = require("../lib/db.js");
const { getUserById, getUserByEmail } = require("../db/queries/getUsers")(db);

// GET redirect user to /login.ejs
router.get("/", (req, res)=> {
  const userID = req.session.userID;
  console.log("userID session cookie", userID);
  getUserById(userID)
  .then((user) => {
    if (user) {
      // if user is logged in, redirect to home (/)
      res.render("../views/index", { user });
      return;
    }

    res.render("../views/login", { error: null });
    return;
  });
});


// GET login/id automatically logs a user in based on id (for demo purposes ONLY)
router.get("/:id", (req, res)=> {
  const userID = req.params.id;
  req.session.userID = userID;
  getUserById(userID)
  .then((user) => {
    res.render("../views/index", { user });
    return;
  });
});


//POST login user if in db and redirect to home (/)
router.post("/", (req, res) => {
  const { email_address, password } = req.body;

  if (!email_address || !password) {
    res.status(400);
    res.render("../views/login", { error: "Email and Password cannot be empty!" });
    return;
  }

  getUserByEmail(email_address)
  .then((user) => {
    if (!user) {
      res.status(400);
      res.render("../views/login", { error: "Invalid email/password, please try again" });
      return;
    }

    const passwordValidation = bcrypt.compareSync(password, user.password);

    if (!passwordValidation) {
      res.status(400);
      res.render("../views/login", { error: "Invalid email/password, please try again" });
      return;
    }

    req.session.userID = user.id;
    res.render("../views/index", { user });
    return;
  });
});

module.exports = router;
