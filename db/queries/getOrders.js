// const { Pool } = require("pg");
const db = require("../../lib/db");
// const db = new Pool(dbParams);
// db.connect();

const orders = () => {
  return db
    .query(`SELECT order_master.id as id, name, phone_number, order_datetime, title, quantity
    FROM order_master 
    INNER JOIN order_line_items ON order_master.id = order_line_items.order_master_id
    INNER JOIN users ON order_master.user_id = users.id
    INNER JOIN items ON order_line_items.item_id = items.id`)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

const orderById = (id) => {
  return db
    .query(`SELECT order_master.id as id, users.name, users.phone_number, order_datetime, items.title, order_line_items.quantity, items.price, estimated_time, status, sum(items.price) as total
    FROM order_master 
    INNER JOIN order_line_items ON order_master.id = order_line_items.order_master_id
    INNER JOIN users ON order_master.user_id = users.id
    INNER JOIN items ON order_line_items.item_id = items.id
    WHERE order_master.id =$1
    GROUP BY order_master.id, users.name, users.phone_number, order_master.order_datetime, items.title, order_line_items.quantity, items.price, order_master.estimated_time, order_master.status;`
    , [id])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};



module.exports = {orders, orderById};