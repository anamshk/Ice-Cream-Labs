// const { Pool } = require("pg");
const db = require("../../lib/db");
// const db = new Pool(dbParams);
// db.connect();

const orders = () => {
  return db
    .query(`SELECT order_master.id as id, name, phone_number, order_datetime, title, price, quantity, estimated_time, status
    FROM order_master 
    INNER JOIN order_line_items ON order_master.id = order_line_items.order_master_id
    INNER JOIN users ON order_master.user_id = users.id
    INNER JOIN items ON order_line_items.item_id = items.id`)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

const getOrderId = (id) => {
  return db
    .query(`SELECT * FROM order_master 
    JOIN order_line_items ON order_master.id = order_master_id 
    WHERE id =$1`, [id])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};



module.exports = {orders, getOrderId};