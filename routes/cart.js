const express = require("express");
const router = express.Router();

// GET redirect user to /cart.ejs
module.exports = (db) => {
  const { getUserById } = require("../db/queries/getUsers.js")(db);
  const { addCart } = require("../db/queries/addCart")(db);
  const { getCart } = require("../db/queries/getCart")(db);
  const { submitCart } = require("../db/queries/submitCart")(db);
  const { editCartItem, deleteCartItem } = require("../db/queries/modifyCart")(db);
  const { orderSubmitted } = require("../lib/twilio");

  // GET /cart,displays cart items to logged in user with option to submit below (POST /cart)
  router.get("/", (req, res) => {
    const userID = req.session.userID;
    getUserById(userID)
      .then((user) => {
        if (!user) {
          res.status(401);
          res.render("login", {
            error: "Unauthorized! Please login or register!",
          });
          return;
        }
        // call get /item
        getCart(userID).then((items) => {
          res.render("../views/cart", { user, items });
          return;
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // POST /cart/id adds single item to cart
  router.post("/:id", (req, res) => {
    const userID = req.session.userID;
    const id = req.params.id;
    getUserById(userID).then((user) => {
      if (!user) {
        res.status(401);
        res.render("login", {
          error: "Unauthorized! Please login or register!",
        });
        return;
      }

      addCart(userID, id)
        .then((result) => {
          res.redirect("/");
          return;
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  });

  // POST /cart/user_id/submit submits cart and upates status field to submitted and sends a notifaction to admin via Twillio
  router.post("/:user_id/submit", (req, res) => {
    const userID = req.session.userID;
    getUserById(userID).then((user) => {
      if (!user) {
        res.status(401);
        res.render("login", {
          error: "Unauthorized! Please login or register!",
        });
        return;
      }

      submitCart(userID)
        .then((result) => {
          res.redirect("/order-status");
          // send text notification to admin using helper function below
          orderSubmitted(userID);
          return;
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  });

    // POST /cart/order_master_id/edit modifies cart item
    router.post("/:item_id/edit", (req, res) => {
      const userID = req.session.userID;
      const item_id = req.params.item_id;
      const quantity = req.body.quantity;
      getUserById(userID).then((user) => {
        if (!user) {
          res.status(401);
          res.render("login", {
            error: "Unauthorized! Please login or register!",
          });
          return;
        }

        editCartItem(quantity, item_id)
          .then((result) => {
            res.redirect("/cart");
            return;
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    });

    // POST /cart/order_master_id/edit modifies cart item
    router.post("/:item_id/delete", (req, res) => {
      const userID = req.session.userID;
      const item_id = req.params.item_id;
      getUserById(userID).then((user) => {
        if (!user) {
          res.status(401);
          res.render("login", {
            error: "Unauthorized! Please login or register!",
          });
          return;
        }

        deleteCartItem(item_id)
          .then((result) => {
            console.log("POST /cart/delete: deleted!!!")
            res.redirect("/cart");
            return;
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    });
  return router;
};
