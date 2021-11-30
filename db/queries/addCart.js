// const { Pool } = require("pg");
// const dbParams = require("../../lib/db");
// const db = new Pool(dbParams);
// db.connect();

/**
 *  1) create new order_master record with userID and then 2) add new item to order_line_item with id created from step one
 * @param {{email_address: string}} item
 * @return {Promise<{}>}
 */



 module.exports = (db) => {
  const addCart = (userID, item) => {
    return db
   .query(`INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING id`, [userID, '2021-12-03 15:14:07', '15', '2021-12-03 15:14:07', 'pending'])
   .then((result) => {
     const orderID = result.rows[0].id
     console.log("addCart promise: ", orderID);
     return db.query(`INSERT INTO order_line_items (item_id, order_master_id, quantity)
     VALUES ($1, $2, $3)
     RETURNING *`, [item.id, orderID, 3])
     .then((result) => {
       console.log("items added!", result.rows)
       return result.rows;
     })
   })
   .catch((err) => {
     console.log(err.message);
   });
  };

  return { addCart };
};
