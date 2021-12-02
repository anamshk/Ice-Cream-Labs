/**
 *  get all items from order_master for user
 * @param {{email_address: string}} item
 * @return {Promise<{}>}
 */

module.exports = (db) => {
  const getCart = (userID) => {
    return db
   .query(`SELECT item_id, order_master_id, quantity, title, description, photo_url, price, SUM(quantity) AS quantity
    FROM   order_line_items
    JOIN order_master ON order_master.id = order_master_id
    JOIN items ON items.id = item_id
    WHERE  order_master .user_id = $1 AND status = 'pending'
    GROUP  BY item_id, order_master_id, quantity, title, description, photo_url, price `, [userID])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  return { getCart };
};


