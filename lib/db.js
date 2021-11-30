let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const {
  Pool
} = require('pg');

const pool = new Pool({
  user: dbParams.user,
  password: dbParams.password,
  host: dbParams.host,
  port: dbParams.port,
  database: dbParams.database,
});

const addMenuItem = (item) => {
  console.log("ITS IN ADD MENU");
  return pool
    .query(`INSERT INTO items (title, description, photo_url, price, inventory)
    VALUES($1, $2, $3, $4, $5) 
    RETURNING *;`, [item.title, item.description, item.photo_url, item.price, item.inventory])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addMenuItem = addMenuItem;

// module.exports = dbParams;
