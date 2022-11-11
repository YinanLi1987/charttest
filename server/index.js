//Assigned to :Yinan
//Founctions: Create the node.js server
//              Define the routes to database for API

const express = require("express");
const cors = require("cors");

const connection = require("./database");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
const port = 3001;
// read data from database
app.get("/", async function (req, res) {
  let sql = "SELECT * FROM v1_v2";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

app.get("/description", async function (req, res) {
  let sql = "SELECT * FROM description";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

app.listen(port, function (err) {
  console.log("listening...." + port);
});
