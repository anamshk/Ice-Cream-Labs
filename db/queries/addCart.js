/**
 *  1) create new order_master record with userID and then 2) add new item to order_line_item with id created from step one
 * @param {{email_address: string}} item
 * @return {Promise<{}>}
 */

module.exports = (db) => {
  const addCart = (userID, item_id) => {
    const datetime = new Date();
    return db
      .query(`SELECT id FROM order_master  WHERE user_id = $1`, [userID])
      .then((result) => {
        // console.log("addCart: does order_master exist?, length should be 0", result.rows.length);
        if (result.rows.length === 0) {
          return db.query(
            `INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`, [userID, datetime, "NULL", datetime, "pending"]
          );
        }
        console.log("order_master_id=", result.rows[0].id)
        return db
          .query(`SELECT id FROM order_master  WHERE user_id = $1`, [userID]);
      })
      .then((result) => {
        // console.log("new order being created after order_master created", result.rows);
        const orderID = result.rows[0].id;
        return db
          .query(
            `INSERT INTO order_line_items (item_id, order_master_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *`, [item_id, orderID, 1]
          )
      })
      .then((result) => {
        // console.log("items added!", result.rows);
        return result.rows;
      })
      // .then((result) => {
      //   console.log("items added to existing order!", result.rows);
      //   return result.rows;
      // })
      .catch((err) => {
        console.log(err);
      });
  };

  return { addCart };
};
