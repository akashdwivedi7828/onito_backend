const express = require("express");
const mysql = require("mysql2");
const app = express();
const tambolaGameRouter = require("./routes/tambola.js");
const db = require("./dbConnection.js");

app.use("/game", tambolaGameRouter);

const start = async () => {
  db.connect((err) => {
    if (err) {
      console.error("Error ", err);
    } else {
      console.log("Connected to MySQL");
    }
  });

  app.listen(8800, () => {
    console.log("server stared on port ", 8800);
  });
};
start();
