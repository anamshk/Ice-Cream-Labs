// const { Pool } = require("pg");
const db = require("../../lib/db");
// const db = new Pool(dbParams);
// db.connect();

const updateMenuItem = (items) => {
  return db
    .query(`UPDATE items 
    SET title =$2, description=$3, photo_url=$4, price=$5, inventory=$6
    WHERE id=$1`, [items.id, items.title, items.description, items.photo_url, items.price, items.inventory])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = updateMenuItem;