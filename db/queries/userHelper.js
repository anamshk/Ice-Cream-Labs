// helper function to insert users into Users table
const { Pool } = require("pg");
const dbParams = require("../../lib/db.js");
const db = new Pool(dbParams);
db.connect();

const bcrypt = require('bcryptjs');
//check to see if email exists

const getUser = (field) => {
  // sql query to get user by field we pass
  return db.query();
};

const getEmailFromId = (userid, database) => {
  return (database[userid]) ? database[userid].email : null;
};

const verifyHash = (userid, password, database) => {
  return bcrypt.compareSync(password, database[userid].password);
};

const finduserbyEmail = (database, email) => {
  for (let userid in database) {
    if (database[userid].email === email) {
      return database[userid];
    }
  }
  return false;
};

const generateRandomString = () => {
  return Math.random().toString(36).substr(2, 6);
};

module.exports = {
  getEmailFromId,
  finduserbyEmail,
  verifyHash,
  generateRandomString
};