// // helper function to insert users into Users table
/**
 * get all items from data base
 * @param {{email_address: string}} item
 * @return {Promise<{}>}
 */
 module.exports = (db) => {
  const getItems = () => {
    return db
      .query("SELECT * FROM items")
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  /**
   * get user database by id.
   * @param {{id: int}} item
   * @return {Promise<{}>}
   */
  const getItemById = (id) => {
    return db
      .query(`SELECT * FROM items WHERE id = $1;`, [id])
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { getItems, getItemById };
 }
