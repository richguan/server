var mysql = require('mysql');

var dbConnection;

if (process.env.NODE_ENV === 'production') {
  dbConnection = mysql.createConnection({
    host: "====================.cloudapp.net",
    user: "====================",
    password: "====================",
    database: "===================="
  });
} else {
  dbConnection = mysql.createConnection({
    user: "root",
    password: "",
    database: "test"
  });
}

dbConnection.connect();

module.exports = dbConnection;
