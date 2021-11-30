// helper function to insert users into Users table
const bcrypt = require('bcryptjs');
const { Pool } = require("pg");
const dbParams = require("../../lib/db");
const db = new Pool(dbParams);
db.connect();

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string, phone_number: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

//TODO: encrypt using bcrypt
const addUser = (user) => {
  return db
    .query(`INSERT INTO users (name, phone_number, email_address, password)
    VALUES($1, $2, $3, $4) RETURNING *;`, [user.name, user.phone_number, user.email_address, user.password])
    .then((result) => {
      console.log("successfully added user!", result.rows[0]);
      // return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = addUser;
