module.exports = (db) => {
  const editCartItem = (quantity, id) => {
    return db
   .query(`UPDATE order_line_items
   SET quantity = $1
   WHERE item_id = $2
   RETURNING *`, [quantity, id])
   .then((result) => {
      return result.rows;
   })
   .catch((err) => {
     console.log(err.message);
   });
  };

  const deleteCartItem = (id) => {
    return db
   .query(`DELETE FROM order_line_items
   WHERE item_id = $1
   RETURNING *`, [id])
   .then((result) => {
      console.log("items deleted!", result.rows)
      return result.rows;
   })
   .catch((err) => {
     console.log(err.message);
   });
  };

  return { editCartItem, deleteCartItem };
};
