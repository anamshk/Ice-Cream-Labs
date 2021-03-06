// let dbParams = {};
// if (process.env.DATABASE_URL) {
//   console.log("1");
//   dbParams.connectionString = process.env.DATABASE_URL;
// } else {
//   console.log("3");
//   dbParams = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
//   };
// }

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

module.exports = pool;
