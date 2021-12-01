// const { Pool } = require("pg");
const db = require("../../lib/db");
// const db = new Pool(dbParams);
// db.connect();

const update = (id) => {
  return db
    .query(`UPDATE table order_master 
    SET status= 'completed'
    WHERE id=$1`, [id])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = update;