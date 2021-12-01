// const { Pool } = require("pg");
const db = require("../../lib/db");
// const db = new Pool(dbParams);
// db.connect();

const getItems = () => {
  return db
    .query(`SELECT * FROM items`)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

const getItemId = (id) => {
  return db
    .query(`SELECT * FROM items WHERE id =$1`, [id])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};



module.exports = {getItems, getItemId};