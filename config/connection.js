const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'TjsS#ycyth_T,L3b36g0',
  database: 'schema.sql',
});

connection.connect((err) => {
  if (err) throw err;
  console.error(`connected as id ${connection.threadId}`);
  connection.end();
});

module.exports = connection;
