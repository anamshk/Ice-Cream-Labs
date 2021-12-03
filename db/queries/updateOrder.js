// const { Pool } = require("pg");
const db = require("../../lib/db");
// const db = new Pool(dbParams);
// db.connect();

const updateStatus = (id, status) => {
  return db
    .query(`UPDATE order_master 
    SET status= $2, completion_datetime= CURRENT_TIMESTAMP
    WHERE id=$1`, [id, status])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = updateStatus;