// // helper function to add item to order or delete item from order
const { Pool } = require("pg");
const dbParams = require("../../lib/db");
const db = new Pool(dbParams);
db.connect();

/**
 * get all items from data base
 * @param {{email_address: string}} item
 * @return {Promise<{}>}
 */

// const getItems = () => {
//   return db
//     .query("SELECT * FROM items")
//     .then((result) => {
//       console.log("getItems promise", result.rows)
//       return result.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// /**
//  * get user database by id.
//  * @param {{id: int}} item
//  * @return {Promise<{}>}
//  */
// const getItemById = (id) => {
//   return db
//     .query(`SELECT * FROM items WHERE id = $1;`, [id])
//     .then((result) => {
//       return result.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };
// module.exports = { getItems, getItemById };
