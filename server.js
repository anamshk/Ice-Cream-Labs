// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// TODO: remove just testing
// const { addCart } = require("./db/queries/addCart")(db);
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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: mount other resources here, using the same pattern above
app.use("/register", registerRoutes);
app.use("/admin", admin);
app.use("/login", loginRoutes);

//app.use("/dashboard", )
// Note: mount other resources here, using the same pattern above

// Home page
// GET / check if user logged in and render index page with all items
app.get("/", (req, res) => {
  // TODO: remove just testing
  // addCart(17, { id: 7 })
  // .then((result) => {
  //   console.log("GET /", result);
  // });

  const userID = req.session.userID;
  getUserById(userID)
  .then((user) => {
    if (!user) {
      res.status(401);
      res.render("login", { error: "Unauthorized! Please login or register to add new urls!" });
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

// POST /logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
