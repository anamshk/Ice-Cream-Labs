// const { Pool } = require("pg");
const db = require("../../lib/db");
// const db = new Pool(dbParams);
// db.connect();

const getOrders = () => {
  return db
    .query(`SELECT * FROM order_master`)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

const getOrderId = (id) => {
  return db
    .query(`SELECT * FROM order_master WHERE id =$1`, [id])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};



module.exports = {getOrders, getOrderId};