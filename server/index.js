const express = require("express");
const cors = require("cors");

const connection = require("./database");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
const port = 3001;

// read data from database v1 v2
app.get("/", async function (req, res) {
  let sql = "SELECT * FROM v1_v2";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V3 monthly data
app.get("/v3_monthly", async function (req, res) {
  let sql = "SELECT * FROM v3_monthly";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V3 annual data
app.get("/v3_annual", async function (req, res) {
  let sql = "SELECT * FROM v3_annual";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V4 and V10
app.get("/v4_v10", async function (req, res) {
  let sql = "SELECT * FROM v4_v10";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V9 Sectors
app.get("/v9_sectors", async function (req, res) {
  let sql = "SELECT * FROM v9_sectors";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V9 Sub-Sectors
app.get("/v9_sub_sectors", async function (req, res) {
  let sql = "SELECT * FROM v9_sub_sectors";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// read data from database v5
app.get("/v5", async function (req, res) {
  let sql = "SELECT * FROM v5";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

// read data from database v6
app.get("/v6", async function (req, res) {
  let sql = "SELECT * FROM v6";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

// read data from database v7
app.get("/v7", async function (req, res) {
  let sql = "SELECT * FROM v7";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});
//read data from database v8
app.get("/v8", async function (req, res) {
  let sql = "SELECT * FROM v8 ";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

//read data from database v8
app.get("/description", async function (req, res) {
  let sql = "SELECT * FROM description ";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

//listen method
app.listen(port, function (err) {
  console.log("listening...." + port);
});

/** */
