// Assigned to :Yinan
//Functions: Configure the database 


const mysql = require("mysql2");
const connection = mysql.createConnection({
  
  user: "root",
  password: "password",
  database: "charttest",

});

module.exports = connection;
