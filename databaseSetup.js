var mysql = require('mysql');
// var fs = require('fs');

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
    database: "==================="
  });
}

dbConnection.connect();

module.exports = dbConnection;

//exports.function....
// exports.findUser = function(username, cb){
//   dbConnection.query("SELECT userid as id from users where username = '" + username + "';", function(err, rows) {
//     cb(err, rows);
//   });
// };
