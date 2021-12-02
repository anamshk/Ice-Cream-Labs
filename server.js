// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const db = require("./lib/db.js");
const { getUserById } = require("./db/queries/getUsers.js")(db);
const { getItems } = require("./db/queries/getItems")(db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(cookieSession({
  name: "session",
  keys: ["key"],
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const registerRoutes = require("./routes/register");
const admin = require("./routes/admin/admin");
const loginRoutes = require("./routes/login");
const cartRoutes = require("./routes/cart");

// Mount all resource routes

app.use("/register", registerRoutes);
app.use("/admin", admin);
app.use("/login", loginRoutes);
app.use("/cart", cartRoutes(db));
//app.use("/dashboard", )


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const userID = req.session.userID;
  getUserById(userID)
    .then((user) => {
      if (!user) {
        res.status(401);
        res.render("login", { error: "Unauthorized! Please login or register!" });
        return;
      }
      // call get /item
      getItems()
        .then((items) => {
          res.render("index", { user, items });
          return;
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// TODO: move to dedicated route
app.get("/order-status", (req, res) => {
  res.render("order-status");
});

// POST /logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
