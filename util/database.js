const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "farah1995",
  database: "node-complete",
});

module.exports = pool.promise();
