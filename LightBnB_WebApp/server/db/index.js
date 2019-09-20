// const { Client } = require('pg');
// require('dotenv').config();

// // Create the connection settings for the db
// const connectionSettings = {
//   host: process.env.PGHOST,
//   user: process.env.PGUSER,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// };

// const pgClient = new Client(connectionSettings);

// // Connect to the database
// pgClient
//   .connect()
//   .then(() => {
//     console.log(`Connected to ${pgClient.database} database`);
//   })
//   .catch();

// module.exports = {
//   query: (queryStr, params) => {
//     const start = Date.now();
//     console.log(`queryStr: ${queryStr}`);
//     console.log(`params: ${params}`);
//     return pgClient.query(queryStr, params)
//       .then(res => {
//         const duration = Date.now() - start;
//         console.log('executed query', { queryStr, duration, rows: res.rowCount });
//         return res;
//       })
//       .catch(err => console.log(err));
//   }
// };


const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
  port: '5432'
});

pool.connect();

module.exports = {
  query: (queryStr, params) => {
    const start = Date.now();
    return pool.query(queryStr, params)
    .then(res => {
      const duration = Date.now() - start;
      console.log('Executed query', {queryStr, duration, rows:res.rowCount });
      return res;
    })
    .catch(err => console.log(err));
  }
}


