require("dotenv").config();
const mysql = require("mysql");

// creating database
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const DB = mysql.createConnection({
  host: DB_HOST || "localhost",
  user: DB_USER || "root",
  password: DB_PASSWORD || "",
  database: DB_DATABASE || "auth-node-sql",
});

module.exports = DB;