// helper function to insert users into Users table
const bcrypt = require('bcryptjs');
const { Pool } = require("pg");
const dbParams = require("../../lib/db");
const db = new Pool(dbParams);
db.connect();

/**
 * get user database by email.
 * @param {{email_address: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

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
    .query(`SELECT * FROM users WHERE email_address = $1;`, [id])
    .then((result) => {
      console.log("from getUsers.js promise", result.rows[0])
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = { getUserByEmail, getUserById };
