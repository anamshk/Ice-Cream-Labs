// const { Pool } = require("pg");
const db = require("../../lib/db");
// const db = new Pool(dbParams);
// db.connect();

const removeMenuItem = (item) => {
  return db
    .query(`DELETE FROM items WHERE id = $1`, [item.id])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = removeMenuItem;