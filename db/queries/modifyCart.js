module.exports = (db) => {
  const editCartItem = (quantity, id) => {
    return db
   .query(`UPDATE order_line_items
   SET quantity = $1
   WHERE order_master_id = $2
   RETURNING *`, [quantity, id])
   .then((result) => {
      console.log("items updated!", result.rows)
      return result.rows;
   })
   .catch((err) => {
     console.log(err.message);
   });
  };

  const deleteCartItem = (id) => {
    return db
   .query(`DELETE order_line_items
   WHERE order_master_id = $1
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
