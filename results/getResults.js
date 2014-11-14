var dbConnection = require('../databaseSetup.js');
var mysql = require('mysql')

exports.getResults = function(request, response){
  var userId = request.body.userId;
  getResultsContents(userId, response);
  
};

// =================== Query Functions ===================//

//getResultsContents is a query function used to access the database
//expect to return an object with 
exports.getResultsContents = function(userId, response){
  //Query used to access mySQL tables
  var query = '';

  //dbConnection.query() method is used to make queries to the mySQL database
  dbConnection.query(query, function(error, data){
    var results = {contents:[]}
    if(error){
      console.log("Could not get results from db because: ", error);
    } else {
      results.contents = data;
      console.log(results, "this is the results i'm sending to front-end")
      response.send(results);
    }
  })
};



//Notes
/*


*/