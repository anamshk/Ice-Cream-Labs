const express = require('express');
const router  = express.Router();

// GET redirect user to /cart.ejs
module.exports = (db) => {
const { getUserById } = require("../db/queries/getUsers.js")(db);
const { addCart } = require("../db/queries/addCart")(db);

router.get("/", (req, res)=> {
  const userID = req.session.userID;
  getUserById(userID)
  .then((user) => {
    if (user) {
      // if user is logged in, redirect to home (/)
      res.render("../views/cart", { user });
      return;
    }

    res.render("../views/login", { error: "Unauthorized! Please login or register!" });
    return;
    });
  });

  router.post("/:id", (req, res) => {
    const userID = req.session.userID;
    const id = req.params.id;
    // console.log("POST /cart:id", id)
    addCart(userID, id)
    .then((result) => {
      // console.log("POST /cart/:item", result);
      res.json(result)
    });
  });

  return router;
}

// TODO: remove just testing

