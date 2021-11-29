const express = require('express');
const bcrypt = require('bcryptjs');
const router  = express.Router();
const {getEmailFromId, finduserbyEmail, verifyHash, generateRandomString} = require('./queries/userHelper');

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

router.get("/", (req, res) => {
  
});

//POST Register if the user is new

router.get("/register", (req, res)=> {
  const templateVars = {
    user: users[req.session.id],
    phoneNumber: phone_number[req.session["phone_number"]],
    email: getEmailFromId(req.session.id, users),
    password: req.session["password"]
  };
  
  res.render("register", templateVars);
});

router.post("/register", (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = finduserbyEmail(user, email);
  console.log(req.body);
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (email === "" || password === "") {
    res.redirect("Incorrect email or password");
  }

  if (!user) {
    const userId = generateRandomString();
    user[userId] = { id: userId, email, password: hashedPassword };
    req.session.id = userId;
  } else {
    res.redirect("_404error");
  }
  res.redirect("/");
});

module.exports = router;