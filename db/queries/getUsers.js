// // helper function to insert users into Users table
const bcrypt = require('bcryptjs');
// const db = require("../../lib/db");

/**
 * get user database by email.
 * @param {{email_address: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
 module.exports = (db) => {
  const getUserByEmail = (email_address) => {
    return db
      .query(`SELECT * FROM users WHERE email_address = $1;`, [email_address])
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  /**
   * get user database by id.
   * @param {{id: int}} user
   * @return {Promise<{}>} A promise to the user.
   */
  const getUserById = (id) => {
    return db
      .query(`SELECT * FROM users WHERE id = $1;`, [id])
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { getUserByEmail, getUserById };
 }
