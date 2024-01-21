const mysql = require("mysql2");
const express = require("express");

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "onito",
});

module.exports = db;
