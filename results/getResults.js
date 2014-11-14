var dbConnection = require('../databaseSetup.js');
var mysql = require('mysql')

exports.getResults = function(request, response){
  var userId = request.body.userId;
  console.log(userId, "this should be the userId")
  getResultsContents(userId, response);

};

// =================== Query Functions ===================//

//getResultsContents is a query function used to access the database
//expect to return an object with 
exports.getResultsContents = function(userId, response){
  //Query used to access mySQL tables
  var query = 'select users.userid, users.username, contents.topic, contents.yes, contents.no, pictures.data from users join contents on users.userId = contents.userId join pictures on contents.pictureId = pictures.pictureId';

  //dbConnection.query() method is used to make queries to the mySQL database
  dbConnection.query(query, function(error, data){
    if(error){
      console.log("Could not get results from db because: ", error);
    } else {
      response.send({resultsContents: [data]});
    }
  })
};



//To test if the server grabs the correct things from the database
/* 

Expect this on client end: 
{
  resultsContents: [{
    topic: 'string',
    picture: some kind of data for pictures,
    userId: 1234,
    userName: 'string',
    yes: 4,
    no: 1
  }]
}
db: test
Inserting: - sql commands 

insert into users (userId, username, password) values (10, 'treelala', 'somepass')
insert into contents (contentId, userId, pictureId, topic, yes, no) values (1, 10, 100, 'cool?', 4, 1);
insert into pictures (pictureId, data) values (100, LOAD_FILE('/Users/teresayung/ThesisProject/server/snowboard-2.jpg'));

Retrieving: 

select users.userid, users.username, contents.topic, contents.yes, contents.no, pictures.data from users join contents on users.userId = contents.userId join pictures on contents.pictureId = pictures.pictureId;



*/