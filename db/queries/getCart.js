/**
 *  get all items from order_master for user
 * @param {{email_address: string}} item
 * @return {Promise<{}>}
 */

module.exports = (db) => {
  const getCart = (userID) => {
    return db
   .query(`SELECT * FROM order_line_items
    JOIN order_master ON order_master.id = order_master_id
    JOIN items ON items.id = item_id
    WHERE user_id = $1 AND status <> 'completed'
    ORDER BY order_datetime;`, [userID])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  return { getCart };
};
