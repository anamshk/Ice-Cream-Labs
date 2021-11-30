const pg = require('pg');

const Client = pg.Client;

const config = {
  user: 'nfroknai',
  host:'castor.db.elephantsql.com',
  database: 'nfroknai',
  password: 'dwWcXK8ocCsF8BGuoHfQDo-gVamPVHVc',
  port: 5432,
};

const client = new Client(config);

client.connect(() => {
  console.log('connected to database');
});

const verb = process.argv[2];

switch (verb) {
case 'browse':
  client.query('SELECT * FROM users;')
    .then((results) => {
      console.log(results.rows);
      client.end();
    });
  
  break;

case 'read':
  const id = process.argv[3];
  client.query('SELECT * FROM users WHERE id LIKE $1;', [id])
    .then((result) => {
      console.log(result.rows[0]);
      client.end();
    });

  break;

default:
  console.log('Please enter a valid verb.');
  client.end();

}