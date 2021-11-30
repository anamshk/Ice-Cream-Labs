const { Pool } = require("pg");
const dbParams = require("../../lib/db");
const db = new Pool(dbParams);
db.connect();

const addMenuItem = (item) => {
  console.log("ITS IN ADD MENU");
  return db
    .query(`INSERT INTO items (title, description, photo_url, price, inventory)
    VALUES($1, $2, $3, $4, $5) 
    RETURNING *;`, [item.title, item.description, item.photo_url, item.price, item.inventory])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = addMenuItem;